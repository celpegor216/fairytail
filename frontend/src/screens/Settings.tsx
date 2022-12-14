// ** 설정
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import '@screens/Settings.scss';
import BgmModal from '@individual/BgmModal';
import InfoModal from '@individual/InfoModal';
import Toggle from '@messageCreate/Toggle';
import Confirm from '@common/Confirm';
import Alert from '@common/Alert';
import MoveToBack from '@common/MoveToBack';
import {returnTrue, returnFalse, popUp, iOS} from '@common/commonFunc';
import {intro} from '@apis/router';

import gear from '@images/gear.png';
import infoImg from '@images/info.svg';

function Settings() {
  const [permitPush, setPermitPush] = useState('');
  const [permitNoti, setPermitNoti] = useState(false);
  const [isBgmModalOpened, setIsBgmModalOpened] = useState(false);
  const [wantLogout, setWantLogout] = useState(false);
  const [wantInfo, setWantInfo] = useState(false);
  const [infoType, setInfoType] = useState('');
  const [info, setInfo] = useState<popUp>({title: '', message: ''});
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  // 좋아요 알림 변경
  // 백그라운드
  const informPermitPush = () => {
    if (!iOS()) {
      if (Notification.permission === 'default') {
        Notification.requestPermission().then(async permission => {
          if (permission === 'default') {
            setPermitPush(() => '설정 가능');
          } else if (permission === 'denied') {
            setPermitPush(() => '거부');
          } else {
            setPermitPush(() => '허용');
          }
        });
      } else {
        changeInfo(
          '안내',
          `현재 알림 ${permitPush} 상태입니다. \n 브라우저/앱의 알림 설정 페이지에서 \n 알림 허용 여부 변경이 가능합니다.`,
        );
        setOpenAlert(returnTrue);
      }
    } else {
      setPermitPush(() => '거부');
      changeInfo(
        '안내',
        `현재 알림 ${permitPush} 상태입니다. \n iOS는 알림 기능이 지원되지 않습니다`,
      );
      setOpenAlert(returnTrue);
    }
  };

  // 포그라운드
  const changePermitNoti = () => {
    setPermitNoti(prev => !prev);
    if (localStorage.getItem('noti')) {
      localStorage.removeItem('noti');
    } else {
      localStorage.setItem('noti', 'true');
    }
  };

  useEffect(() => {
    if (!iOS()) {
      const {permission} = Notification;
      if (permission === 'denied') {
        setPermitPush(() => '거부');
      } else if (permission === 'granted') {
        setPermitPush(() => '허용');
      } else {
        setPermitPush(() => '설정 가능');
      }
    } else {
      setPermitPush(() => '거부');
    }
    if (localStorage.getItem('noti')) {
      setPermitNoti(returnTrue);
    }
  }, []);

  // 팝업에 뜰 내용 변경
  const changeInfo = (title: popUp['title'], message: popUp['message']) => {
    setInfo(() => ({
      title,
      message,
    }));
  };

  // 로그아웃
  const logoutConfirm = () => {
    changeInfo('확인', '정말 로그아웃하시겠어요?');
    setWantLogout(returnTrue);
  };

  // 로그아웃 요청 백에 보내기
  const logout = () => {
    window.localStorage.clear();
    changeInfo('완료', '정상적으로 로그아웃되었습니다.');
    setOpenAlert(returnTrue);
  };

  // alert 창 닫기
  const closeAlert = () => {
    setOpenAlert(returnFalse);
    if (info.message === '정상적으로 로그아웃되었습니다.') {
      navigate(intro());
    }
  };

  // 모달 창에서 로그아웃 취소
  const cancelLogout = () => {
    setWantLogout(returnFalse);
  };

  // bgm 모달
  const openBgmModal = () => {
    setIsBgmModalOpened(returnTrue);
  };

  const closeBgmModal = () => {
    setIsBgmModalOpened(returnFalse);
  };

  // 라이선스, 개인정보 처리방침 모달
  const openInfoModal = (type: string) => {
    return () => {
      setInfoType(type);
      setWantInfo(returnTrue);
    };
  };
  const closeInfoModal = () => {
    setWantInfo(returnFalse);
  };

  return (
    <main className="screen">
      <MoveToBack path="-1" />
      <div className="container settings-container">
        <div className="settings-header">
          <img src={gear} alt="icon" className="settings-header-icon" />
        </div>
        {/* 애플리케이션 */}
        <section className="settings-section">
          <div className="settings-title">애플리케이션</div>
          <div className="settings-between">
            <div className="settings-each" onClick={informPermitPush}>
              좋아요 푸시 알림
            </div>
            <div
              className="settings-each settings-push"
              onClick={informPermitPush}>
              {permitPush}
              <img
                src={infoImg}
                alt="좋아요 푸시 알림 안내"
                className="settings-push-icon"
              />
            </div>
          </div>
          <div className="settings-between">
            <div className="settings-each" onClick={changePermitNoti}>
              앱 사용 중 좋아요 알림
            </div>
            <Toggle label="" onClick={changePermitNoti} value={permitNoti} />
          </div>
          <div className="settings-between">
            <div className="settings-each" onClick={openBgmModal}>
              배경음악 설정
            </div>
          </div>
        </section>

        {/* 계정 */}
        <section className="settings-section">
          <div className="settings-title">계정</div>
          <div
            className="settings-each settings-margin-bottom"
            onClick={logoutConfirm}>
            로그아웃
          </div>
        </section>

        {/* 기타 */}
        <section className="settings-section">
          <div className="settings-title">기타</div>
          <div
            className="settings-each settings-margin-bottom"
            onClick={openInfoModal('license')}>
            라이선스
          </div>
          <span
            className="settings-each settings-margin-bottom"
            onClick={openInfoModal('privacyPolicy')}>
            개인정보 처리방침
          </span>
        </section>
        {/* 로그아웃 확인 */}
        <Confirm
          info={info}
          open={wantLogout}
          onConfirmed={logout}
          onCancel={cancelLogout}
        />

        {/* 로그아웃 완료 */}
        <Alert info={info} open={openAlert} onConfirmed={closeAlert} />

        {/* 배경음악 목록 */}
        <BgmModal open={isBgmModalOpened} onCancel={closeBgmModal} />

        {/* 라이선스, 개인정보 처리방침 모달 */}
        <InfoModal
          open={wantInfo}
          onConfirmed={closeInfoModal}
          type={infoType}
        />
      </div>
    </main>
  );
}

export default Settings;
