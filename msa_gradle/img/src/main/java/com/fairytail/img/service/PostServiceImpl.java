package com.fairytail.img.service;


import com.fairytail.img.client.NotiFeignClient;
import com.fairytail.img.dto.*;
import com.fairytail.img.jpa.*;
import com.fairytail.img.util.MainUtil;
import com.fairytail.img.util.S3Util;
import com.fairytail.img.client.UserReportFeignClient;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class
PostServiceImpl implements PostService {
    private final PostRepository postRepository;
    private final PostLikeRepository postLikeRepository;

    private final PostReportRepository postReportRepository;

    private final S3Util s3Util;

    private final MainUtil mainUtil;

    private final UserReportFeignClient userReportFeignClient;

    private final NotiFeignClient notiFeignClient;

    private String dirName = "image";

    /**
     * 이미지 게시글 생성
     */
    @Override
    public PostDto createPost(PostDto dto) throws IOException {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        PostDto data = null;
        PostEntity img = modelMapper.map(dto, PostEntity.class);
        Long maxIdx = Long.valueOf(0);
        if(postRepository.getMaxId() == null) {
            maxIdx = Long.valueOf(1);
        } else{
            maxIdx = postRepository.getMaxId() + 1; //s3 저장 파일에 idx를 넣어주기 위해 조회
        }
        MultipartFile file = dto.getFile();
        File filePath = new File(mainUtil.osCheck() + "/" + dirName + "_" + maxIdx + "_" + file.getOriginalFilename());
        file.transferTo(filePath);
        String url = s3Util.upload(filePath, dirName);
        img.setUrl(url);
        LocalDateTime now = LocalDateTime.now(); //현재 시간 받아서
        Integer hour =  now.getHour(); //시간만 받고
        Integer dayType = mainUtil.checkTime(hour); //dayType 계산
        img.setDayType(dayType); //dayType값 넣어주기
        img.setDate(now);
        PostEntity res = postRepository.save(img);
        data = modelMapper.map(res, PostDto.class);
        filePath.delete();
        return data;
    }
    /**
     * 이미지 게시글 상세 조회
     */
    @Override
    public PostDto readPost(Long postId, Long userId) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        Optional<PostEntity> optional = postRepository.findByPostId(postId);
        if(optional.isPresent()){
            PostEntity post = optional.get();
            data = modelMapper.map(post, PostDto.class);
            Boolean isLike = checkLike(postId, userId);
            data.setIsLike(isLike);
        }
        return data;
    }
    /**
     * 이미지 공개 여부 수정
     */
    @Override
    public PostDto putPost(PostDto dto) throws IOException{
        ModelMapper modelMapper = new ModelMapper();
        PostDto data = null;
        Optional<PostEntity> optional = postRepository.findByPostId(dto.getPostId());
        if(optional.isPresent()){
            PostEntity post = optional.get();
            post.setStatus(dto.getStatus());
            postRepository.save(post);
            data = modelMapper.map(post, PostDto.class);
        }
        return data;
    }
    /**
     * 이미지 게시글 삭제
     */
    @Override
    public Boolean deletePost(Long postId) {
        Boolean data = false;
        Optional<PostEntity> optional = postRepository.findByPostId(postId);
        if(optional.isPresent()){
            PostEntity post = optional.get();
            String url = post.getUrl();
            String oldPath = mainUtil.urlToFilePath(url);
            if (oldPath != null){
                s3Util.delete(oldPath);
            }
            Long res = postRepository.deleteByPostId(post.getPostId());
            if(res != 0){
                data = true;
            }
        }
        return data;
    }
    /**
     *  주변 이미지 게시글 최신순 조회
     */
    @Override
    public List<PostDto> readPostListLatest(Double lat, Double lng, Long userId) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        List<PostEntity> list = postRepository.findTop25ByLatAndLngAndStatusOrderByDateDesc(lat, lng, userId);
        List<PostDto> data = new ArrayList<>();
        if(list != null){
            for (PostEntity l: list) {
                PostDto insert = modelMapper.map(l, PostDto.class);
                data.add(insert);
            }
        }
        return data;
    }
    /**
     * 주변 이미지 게시글 좋아요 순 조회
     */
    @Override
    public List<PostDto> readPostListLike(Double lat, Double lng, Long userId) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        List<PostEntity> list = postRepository.findTop25ByLatAndLngAndStatusOrderByLikeCntDesc(lat, lng, userId);
        List<PostDto> data = new ArrayList<>();
        if(list != null){
            for (PostEntity l: list) {
                PostDto insert = modelMapper.map(l, PostDto.class);
                data.add(insert);
            }
        }
        return data;
    }
    /**
     * 내 이미지 게시글 조회
     */
    @Override
    public List<PostDto> readMyPostList(Long userId) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        List<PostEntity> list = postRepository.findByUserIdOrderByDateDesc(userId);
        List<PostDto> data = new ArrayList<>();
        if(list != null){
            for (PostEntity l :list){
                PostDto insert = modelMapper.map(l, PostDto.class);
                data.add(insert);
            }
        }
        return data;
    }
    /**
     * 이미지 게시글 좋아요, 좋아요 취소 기능
     */
    @Override
    public Boolean createLike(PostLikeDto dto) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        Optional<PostLikeEntity> optionalLike = postLikeRepository.findByPostIdAndUserId(dto.getPostId(), dto.getUserId());
        if(optionalLike.isPresent()){
            PostLikeEntity like = optionalLike.get();
            postLikeRepository.delete(like);
            Optional<PostEntity> optional = postRepository.findByPostId(dto.getPostId());
            if(optional.isPresent()){
                PostEntity post = optional.get();
                Long count = postLikeRepository.countByPostId(dto.getPostId());
                post.setLikeCnt(count);
                postRepository.save(post);
            }
            return false;
        } else{
            PostLikeEntity postLike = modelMapper.map(dto, PostLikeEntity.class);
            postLikeRepository.save(postLike);
            Optional<PostEntity> optional = postRepository.findByPostId(dto.getPostId());
            PostEntity post = null;

            if(optional.isPresent()){
                post = optional.get();
                Long count = postLikeRepository.countByPostId(dto.getPostId());
                post.setLikeCnt(count);
                postRepository.save(post);

                PostDto postDto = modelMapper.map(post, PostDto.class);

                /** 좋아요 알림 요청 보내기 */
                // 요청 데이터 세팅
                NotiRequestDto requestDto = new NotiRequestDto();
                requestDto.setToken(userReportFeignClient.getUserToken(dto.getWriterId()));
                requestDto.setTitle(postDto.getTitle());
                requestDto.setData(modelMapper.map(post, NotiLikeRequestDto.class));
                // 요청 보내기
                notiFeignClient.createNotiLike(requestDto);
            }
            
            return true;
        }
    }
    /**
     * 이미지 게시글 신고 누르기
     */
    @Override
    public Boolean createReport(PostReportDto dto) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        Optional<PostReportEntity> optional = postReportRepository.findByPostIdAndUserId(dto.getPostId(), dto.getUserId());
        if (optional.isPresent()){
            return false;
        } else{
            PostReportEntity postReport = modelMapper.map(dto, PostReportEntity.class);
            postReportRepository.save(postReport);
            Optional<PostEntity> optionalPost = postRepository.findByPostId(dto.getPostId());
            if(optionalPost.isPresent()){
                PostEntity post = optionalPost.get();
                post.setReportCnt(post.getReportCnt() + 1);
                postRepository.save(post);
                changeStatus(post);
                return true;
            } else{
                return false;
            }
        }
    }
    /**
     * 이미지 게시글 신고 횟수 5회 이상시 게시글 잠금 기능
     */
    @Override
    public Boolean changeStatus(PostEntity post) throws Exception {
        Integer reportCnt =  post.getReportCnt();
        if(reportCnt >= 3){
            post.setStatus(2);
            postRepository.save(post);
            userReportFeignClient.userReport(post.getUserId()); //Feign을 이용해 userId 신고 횟수 증가
            return true;
        }
        return false;
    }
    /**
     * 이미지 게시글 전체 좌표 조회
     */
    @Override
    public List<PostDto> readAllPost(Long userId) throws Exception {
        ModelMapper modelMapper = new ModelMapper();
        List<PostDto> data = new ArrayList<>();
        List<PostEntity> res = postRepository.findAllByUserIdOrStatus(userId, 0);
        for (PostEntity r: res) {
            PostDto d = modelMapper.map(r, PostDto.class);
            data.add(d);
        }
        return data;
    }

    /** 이미지의 유해성 여부를 판별해서 유해하면 1을 유해하지 않으면 0을 에러 발생시 -1 반환 */
    @Override
    public Integer detectSafeSearch(MultipartFile file) throws IOException {
        String responseAnnotation = null;
        Integer result = 0; // 이미지의 유해성 여부 (1: 유해함, 0: 유해하지 않음)
        List<AnnotateImageRequest> requests = new ArrayList<>();

        ByteString imgBytes = ByteString.readFrom(file.getInputStream());

        Image img = Image.newBuilder().setContent(imgBytes).build();
        Feature feat = Feature.newBuilder().setType(Feature.Type.SAFE_SEARCH_DETECTION).build();
        AnnotateImageRequest request =
                AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);

        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            List<AnnotateImageResponse> responses = response.getResponsesList();

            for (AnnotateImageResponse res : responses) {
                if (res.hasError()) {
                    System.out.format("Error: %s%n", res.getError().getMessage());
                    return -1;
                }

                // For full list of available annotations, see http://g.co/cloud/vision/docs
                SafeSearchAnnotation annotation = res.getSafeSearchAnnotation();

                // 이미지의 각 유해성 판단 값 점수로 저장
                int violence = annotation.getViolenceValue();
                int racy = annotation.getRacyValue();
                int medical = annotation.getMedicalValue();
                int adult = annotation.getAdultValue();

                // 각 판단 기준을 하나라도 위반할 시 유해한 이미지로 인식
                if (violence >= 3 || racy >= 5 || medical >= 4 || adult >= 4)
                    result = 1;
            }
        }

        return result;
    }
    /**
     * 이미지 게시글 좋아요 눌린지 여부 체크
     */
    public Boolean checkLike(Long userId, Long postId) throws Exception{
        Optional<PostLikeEntity> optional = postLikeRepository.findByPostIdAndUserId(userId, postId);
        if (optional.isPresent()){
            return true;
        } else{
            return false;
        }
    }
}
