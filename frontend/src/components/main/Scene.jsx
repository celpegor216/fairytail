import useSpline from '@splinetool/r3f-spline';
import {PerspectiveCamera} from '@react-three/drei';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

//route
import {
  globe,
  vr,
  map,
  messageList,
  messageCreate,
  settings,
  notifications,
} from '@apis/router.ts';

// recoil
import {useRecoilState} from 'recoil';
import {bgmNoState, playingState} from '@/apis/recoil';

export default function Scene({...props}) {
  const {nodes, materials} = useSpline(
    'https://prod.spline.design/2uEjxOedlTWCvPSa/scene.splinecode',
  );

  const navigate = useNavigate();

  const moveMap = event => {
    event.stopPropagation();
    navigate(map());
  };

  const moveVR = event => {
    event.stopPropagation();
    navigate(vr());
  };

  const moveMessage = event => {
    event.stopPropagation();
    navigate(messageList());
  };

  const moveCreate = event => {
    event.stopPropagation();
    navigate(messageCreate());
  };

  const moveSettings = event => {
    event.stopPropagation();
    navigate(settings());
  };

  const moveNotifications = event => {
    event.stopPropagation();
    navigate(notifications());
  };

  const [isPlaying, setIsPlaying] = useRecoilState(playingState);
  const [bgmNo, setBgmNo] = useRecoilState(bgmNoState);
  const [cnt, setCnt] = useState(0);

  const changeBgmNo = event => {
    event.stopPropagation();
    setIsPlaying(true);
    localStorage.setItem('isPlaying', 'true');
    let tempNo = 0;
    if (bgmNo >= 9) {
      tempNo = 0;
    } else {
      tempNo = bgmNo + 1;
    }
    setBgmNo(tempNo);
    localStorage.setItem('bgmNo', JSON.stringify(tempNo));
  };

  const handleMoveGlobe = () => {
    setCnt(cnt + 1);
    if (cnt > 5) {
      setCnt(0);
      navigate(globe());
    }
  };

  return (
    <>
      <group {...props} dispose={null}>
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={0.7}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-3108.301}
          shadow-camera-right={3108.301}
          shadow-camera-top={3108.301}
          shadow-camera-bottom={-3108.301}
          position={[-723.38, 1320.76, 435.43]}
        />
        <mesh
          name="Walls"
          geometry={nodes.Walls.geometry}
          material={materials['Walls Material']}
          castShadow
          receiveShadow
          position={[24.17, -331.76, -26.55]}
          rotation={[-1.57, 0, -1.57]}
          scale={0.7}
        />
        <group name="Objects" position={[51.27, 362.21, -28.87]}>
          <group
            name="??????"
            position={[504.16, -239.98, 361.68]}
            rotation={[-Math.PI / 2, -0.01, -2.07]}
            scale={[1.2, 1.69, 1.48]}>
            <mesh
              name="Rectangle 4"
              geometry={nodes['Rectangle 4'].geometry}
              material={materials['Mat 3']}
              castShadow
              receiveShadow
              position={[-0.85, 2.56, -0.13]}
              onClick={moveNotifications}
            />
            <mesh
              name="Rectangle 3"
              geometry={nodes['Rectangle 3'].geometry}
              material={materials['Mat 3']}
              castShadow
              receiveShadow
              position={[-0.85, 16.03, -0.13]}
              onClick={moveNotifications}
            />
            <mesh
              name="Rectangle 2"
              geometry={nodes['Rectangle 2'].geometry}
              material={materials['Mat 4']}
              castShadow
              receiveShadow
              position={[-0.33, -4.52, -4.33]}
              onClick={moveNotifications}
            />
            <mesh
              name="Cube"
              geometry={nodes.Cube.geometry}
              material={materials['Mat 2']}
              castShadow
              receiveShadow
              position={[0.84, -23.92, 9.25]}
              onClick={moveNotifications}
            />
          </group>
          <group
            name="?????????"
            position={[537.93, -523.98, 195.81]}
            rotation={[0, -0.78, 0]}
            scale={0.61}>
            <mesh
              name="Sphere"
              geometry={nodes.Sphere.geometry}
              material={materials['Sphere Material']}
              castShadow
              receiveShadow
              position={[0, 0, 0]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={1}
              onClick={() => handleMoveGlobe()}
            />
          </group>
          <group
            name="star - ??????"
            position={[773.15, 742.86, -7.29]}
            rotation={[0, -1.44, 0]}
            scale={0.15}>
            <mesh
              name="star"
              geometry={nodes.star.geometry}
              material={materials.yellow}
              castShadow
              receiveShadow
              position={[-6.89, -18.18, 0]}
              scale={3.72}
              onClick={moveMap}
            />
          </group>
          <group
            name="star - ??????"
            position={[619.77, 407.63, 771.8]}
            rotation={[0, -0.98, 0]}
            scale={0.15}>
            <mesh
              name="star1"
              geometry={nodes.star1.geometry}
              material={materials.yellow}
              castShadow
              receiveShadow
              position={[-6.89, -18.18, 0]}
              scale={3.72}
              onClick={moveCreate}
            />
          </group>
          <group
            name="star - ??????"
            position={[491.83, -100.33, 349.46]}
            rotation={[0, -0.01, 0]}
            scale={1}>
            <mesh
              name="star2"
              geometry={nodes.star2.geometry}
              material={materials.yellow}
              castShadow
              receiveShadow
              position={[0.31, -2.81, 1.02]}
              rotation={[0, -1.28, 0]}
              scale={[-0.16, 0.16, 0.16]}
              onClick={moveNotifications}
            />
          </group>
          <group
            name="star - ?????????"
            position={[666.82, -17.13, -63.24]}
            rotation={[0, -1.28, 0]}
            scale={[-0.16, 0.16, 0.16]}>
            <mesh
              name="star3"
              geometry={nodes.star3.geometry}
              material={materials.yellow}
              castShadow
              receiveShadow
              position={[-6.89, -18.18, 0]}
              scale={3.72}
              onClick={moveSettings}
            />
          </group>
          <group
            name="star - ???"
            position={[423.2, -71.43, -495.95]}
            rotation={[0, -0.94, 0]}
            scale={0.15}>
            <mesh
              name="star4"
              geometry={nodes.star4.geometry}
              material={materials.yellow}
              castShadow
              receiveShadow
              position={[-6.89, -18.18, 0]}
              scale={3.72}
              onClick={moveMessage}
            />
          </group>
          <group
            name="star - ?????????"
            position={[-206.81, -71.43, -350.67]}
            rotation={[0, -0.41, 0]}
            scale={0.15}>
            <mesh
              name="star5"
              geometry={nodes.star5.geometry}
              material={materials.yellow}
              castShadow
              receiveShadow
              position={[-6.89, -18.18, 0]}
              scale={3.72}
              onClick={moveVR}
            />
          </group>
          <group
            name="??????"
            position={[668.16, 61.72, 736.95]}
            rotation={[0.15, 0, 0]}
            scale={1.52}>
            <mesh
              name="cord"
              geometry={nodes.cord.geometry}
              material={materials['cord Material']}
              castShadow
              receiveShadow
              position={[-0.09, -106.61, 2.08]}
              rotation={[0, 0, -0.04]}
              scale={[0.04, 2.76, 0.04]}
              onClick={moveCreate}
            />
            <mesh
              name="baseballoon"
              geometry={nodes.baseballoon.geometry}
              material={materials['baseballoon Material']}
              castShadow
              receiveShadow
              position={[4.15, -20.25, 2.36]}
              scale={0.31}
              onClick={moveCreate}
            />
            <mesh
              name="balloon"
              geometry={nodes.balloon.geometry}
              material={materials.ballon}
              castShadow
              receiveShadow
              position={[-17.4, 114.61, -6.75]}
              rotation={[0, 0, 0.14]}
              scale={1.28}
              onClick={moveCreate}
            />
          </group>
          <group
            name="?????????"
            position={[-177.08, -362.21, -339.87]}
            rotation={[Math.PI, -1.49, Math.PI]}
            scale={1}>
            <mesh
              name="topfrontpiece"
              geometry={nodes.topfrontpiece.geometry}
              material={materials.blackparts}
              castShadow
              receiveShadow
              position={[-228.43, 209.77, 2.25]}
              rotation={[0, 0, 1.15]}
              scale={1.03}
              onClick={moveVR}
            />
            <group name="baselegs" position={[63, -287.95, 0]} scale={0.75}>
              <mesh
                name="Cylinder 15"
                geometry={nodes['Cylinder 15'].geometry}
                material={materials.blackparts}
                castShadow
                receiveShadow
                position={[-5.46, 0, -227.53]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.29}
                onClick={moveVR}
              />
              <mesh
                name="Cylinder 13"
                geometry={nodes['Cylinder 13'].geometry}
                material={materials.blackparts}
                castShadow
                receiveShadow
                position={[-5.46, 0, 227.53]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.29}
                onClick={moveVR}
              />
              <mesh
                name="Cylinder 14"
                geometry={nodes['Cylinder 14'].geometry}
                material={materials.blackparts}
                castShadow
                receiveShadow
                position={[204.74, 0, 2.89]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.29}
                onClick={moveVR}
              />
              <mesh
                name="Cylinder 12"
                geometry={nodes['Cylinder 12'].geometry}
                material={materials.blackparts}
                castShadow
                receiveShadow
                position={[-204.74, 0, 2.89]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={0.29}
                onClick={moveVR}
              />
            </group>
            <mesh
              name="backleg"
              geometry={nodes.backleg.geometry}
              material={materials.whiteparts}
              castShadow
              receiveShadow
              position={[140.64, -177.73, 4.17]}
              rotation={[0.01, 0, 0.63]}
              scale={[0.25, 0.05, 0.25]}
              onClick={moveVR}
            />
            <mesh
              name="frontleg"
              geometry={nodes.frontleg.geometry}
              material={materials.whiteparts}
              castShadow
              receiveShadow
              position={[-21.26, -176.47, 1.36]}
              rotation={[-0.02, -0.02, -0.59]}
              scale={[0.25, 0.05, 0.25]}
              onClick={moveVR}
            />
            <mesh
              name="leg_r"
              geometry={nodes.leg_r.geometry}
              material={materials.whiteparts}
              castShadow
              receiveShadow
              position={[58.01, -178.34, -90.83]}
              rotation={[0.66, 0.01, 0.01]}
              scale={[0.25, 0.05, 0.25]}
              onClick={moveVR}
            />
            <mesh
              name="leg_l"
              geometry={nodes.leg_l.geometry}
              material={materials.whiteparts}
              castShadow
              receiveShadow
              position={[58.03, -179.58, 94]}
              rotation={[-0.65, -0.01, 0.01]}
              scale={[0.25, 0.05, 0.25]}
              onClick={moveVR}
            />
            <mesh
              name="centerleg"
              geometry={nodes.centerleg.geometry}
              material={materials.whiteparts}
              castShadow
              receiveShadow
              position={[56.56, -95.31, 1.97]}
              rotation={[0, 0, 0.02]}
              scale={[0.25, 0.05, 0.25]}
              onClick={moveVR}
            />
            <mesh
              name="legjoint"
              geometry={nodes.legjoint.geometry}
              material={materials.blackparts}
              castShadow
              receiveShadow
              position={[55.54, -66.97, 1.97]}
              rotation={[0, 0, 0.02]}
              scale={[0.75, 0.46, 0.75]}
              onClick={moveVR}
            />
            <mesh
              name="highpieceadjustment"
              geometry={nodes.highpieceadjustment.geometry}
              material={materials.whiteparts}
              castShadow
              receiveShadow
              position={[53.11, 17.72, 1.77]}
              rotation={[0, 0, 0.02]}
              scale={0.28}
              onClick={moveVR}
            />
            <mesh
              name="screw2"
              geometry={nodes.screw2.geometry}
              material={materials.whiteparts}
              castShadow
              receiveShadow
              position={[63.53, 54.3, -40.51]}
              rotation={[-0.35, 0.15, 1.18]}
              scale={[0.16, 0.16, 0.04]}
              onClick={moveVR}
            />
            <mesh
              name="screw1"
              geometry={nodes.screw1.geometry}
              material={materials.whiteparts}
              castShadow
              receiveShadow
              position={[63.75, 54.79, 42.56]}
              rotation={[0.36, -0.16, 1.18]}
              scale={[0.16, 0.16, 0.04]}
              onClick={moveVR}
            />
            <mesh
              name="sphericsupport"
              geometry={nodes.sphericsupport.geometry}
              material={materials.blackparts}
              castShadow
              receiveShadow
              position={[53.43, 20.06, 1.7]}
              rotation={[0, 0, 1.15]}
              scale={0.36}
              onClick={moveVR}
            />
            <mesh
              name="supportpiece"
              geometry={nodes.supportpiece.geometry}
              material={materials.blackparts}
              castShadow
              receiveShadow
              position={[54.21, 33.99, 1.12]}
              rotation={[0, 0, 1.15]}
              scale={[0.1, 0.3, 0.75]}
              onClick={moveVR}
            />
            <mesh
              name="littleglass"
              geometry={nodes.littleglass.geometry}
              material={materials.glass}
              castShadow
              receiveShadow
              position={[312.76, -24.87, 1.42]}
              rotation={[0.23, -0.1, 1.17]}
              scale={[0.14, 0.02, 0.14]}
              onClick={moveVR}
            />
            <mesh
              name="glass"
              geometry={nodes.glass.geometry}
              material={materials.glass}
              castShadow
              receiveShadow
              position={[-265.21, 228.83, 0.92]}
              rotation={[0.23, -0.1, 1.17]}
              scale={[0.79, 0.13, 0.79]}
              onClick={moveVR}
            />
            <mesh
              name="centerpiece"
              geometry={nodes.centerpiece.geometry}
              material={materials.blackparts}
              castShadow
              receiveShadow
              position={[166.74, 37.61, 1.47]}
              rotation={[0, 0, 1.15]}
              scale={[0.63, 0.37, 0.63]}
              onClick={moveVR}
            />
            <mesh
              name="peephole"
              geometry={nodes.peephole.geometry}
              material={materials.blackparts}
              castShadow
              receiveShadow
              position={[308.29, -23.84, 1.1]}
              rotation={[0, 0, 1.15]}
              scale={0.26}
              onClick={moveVR}
            />
            <mesh
              name="basetelescope"
              geometry={nodes.basetelescope.geometry}
              material={materials.redparts}
              castShadow
              receiveShadow
              position={[105.9, 64.11, 1.26]}
              rotation={[0, 0, 1.16]}
              scale={0.4}
              onClick={moveVR}
            />
            <mesh
              name="body"
              geometry={nodes.body.geometry}
              material={materials.redparts}
              castShadow
              receiveShadow
              position={[-209.78, 202.81, 1.26]}
              rotation={[0, 0, 1.16]}
              scale={0.76}
              onClick={moveVR}
            />
          </group>
          <group name="???(??????)" position={[750.17, -126.85, -719.48]}>
            <mesh
              name="book-1"
              geometry={nodes['book-1'].geometry}
              material={materials.purple}
              castShadow
              receiveShadow
              position={[-42.13, -51.79, -35.07]}
              rotation={[-Math.PI / 2, -1.4, -Math.PI / 2]}
              scale={1}
            />
            <mesh
              name="book-2"
              geometry={nodes['book-2'].geometry}
              material={materials['blue-1-3']}
              castShadow
              receiveShadow
              position={[70.6, 0.51, 0]}
              rotation={[0, -Math.PI / 2, 0]}
            />
            <mesh
              name="book-3"
              geometry={nodes['book-3'].geometry}
              material={materials['blue-a-2']}
              castShadow
              receiveShadow
              position={[45.7, -33.99, -18.42]}
              rotation={[0, -Math.PI / 2, 0]}
            />
            <mesh
              name="book-4"
              geometry={nodes['book-4'].geometry}
              material={materials['blue-a-2']}
              castShadow
              receiveShadow
              position={[5.73, -27.49, -18.42]}
              rotation={[-Math.PI / 2, -1.48, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group name="??? - my list" position={[461.44, -237.7, -506.91]}>
            <mesh
              name="paper 2"
              geometry={nodes['paper 2'].geometry}
              material={materials['paper 2 Material']}
              castShadow
              receiveShadow
              position={[-21.38, -15.18, 12.29]}
              rotation={[-Math.PI / 2, 0, -1.31]}
              scale={1}
              onClick={moveMessage}
            />
            <mesh
              name="paper"
              geometry={nodes.paper.geometry}
              material={materials['paper Material']}
              castShadow
              receiveShadow
              position={[8.89, -14.38, 22.3]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
              onClick={moveMessage}
            />
            <group
              name="book-5"
              position={[41.7, 0, -27.45]}
              rotation={[-0.01, -0.18, -1.57]}
              scale={[1.03, 1.88, 1.72]}>
              <mesh
                name="Rectangle"
                geometry={nodes.Rectangle.geometry}
                material={materials['Rectangle Material']}
                castShadow
                receiveShadow
                position={[-22.7, 32.77, 1.79]}
                rotation={[0, -Math.PI / 2, 0]}
                onClick={moveMessage}
              />
              <mesh
                name="Cube 4"
                geometry={nodes['Cube 4'].geometry}
                material={materials['Cube 4 Material']}
                castShadow
                receiveShadow
                position={[-0.32, 0.86, 0.42]}
                rotation={[0, 0, 0]}
                scale={[0.99, 1.01, 1]}
                onClick={moveMessage}
              />
              <mesh
                name="Cube 41"
                geometry={nodes['Cube 41'].geometry}
                material={materials['Cube 41 Material']}
                castShadow
                receiveShadow
                position={[-16.68, -0.27, 9.75]}
                rotation={[0, 0, 0]}
                scale={[0.99, 1.01, 1]}
                onClick={moveMessage}
              />
            </group>
          </group>
          <group
            name="?????????"
            position={[687.33, -201.85, -72.29]}
            rotation={[Math.PI, -1.55, Math.PI]}
            scale={1}>
            <group
              name="Group"
              position={[-1.33, 89.68, -11.15]}
              rotation={[0, 0.67, 0]}
              scale={1}>
              <mesh
                name="Rectangle 6"
                geometry={nodes['Rectangle 6'].geometry}
                material={materials['blue-1-3']}
                castShadow
                receiveShadow
                position={[46.52, 45.59, -58.48]}
                rotation={[-0.22, -0.66, -1.71]}
                scale={0.84}
                onClick={moveSettings}
              />
              <mesh
                name="Rectangle 61"
                geometry={nodes['Rectangle 61'].geometry}
                material={materials.purple}
                castShadow
                receiveShadow
                position={[51.33, 45.04, -64.53]}
                rotation={[-0.22, -0.66, -1.71]}
                scale={0.84}
                onClick={moveSettings}
              />
              <mesh
                name="Rectangle 5"
                geometry={nodes['Rectangle 5'].geometry}
                material={materials['blue-1-3']}
                castShadow
                receiveShadow
                position={[4.42, -66.89, -6.25]}
                rotation={[-1.22, -0.27, -2.19]}
                scale={0.84}
                onClick={moveSettings}
              />
              <mesh
                name="Rectangle 41"
                geometry={nodes['Rectangle 41'].geometry}
                material={materials.purple}
                castShadow
                receiveShadow
                position={[-9.76, -82.25, 11.61]}
                rotation={[-1.22, -0.27, -2.19]}
                scale={0.84}
                onClick={moveSettings}
              />
              <mesh
                name="Cube 7"
                geometry={nodes['Cube 7'].geometry}
                material={materials['main-3']}
                castShadow
                receiveShadow
                position={[-58.97, -92.67, -139.61]}
                rotation={[-Math.PI, 0.67, -Math.PI / 2]}
                scale={1}
                onClick={moveSettings}
              />
            </group>
            <mesh
              name="Cube 71"
              geometry={nodes['Cube 71'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[-139.98, -2.99, -81.82]}
              rotation={[-Math.PI, 0, -Math.PI / 2]}
              scale={1}
              onClick={moveSettings}
            />
            <mesh
              name="Cube 6"
              geometry={nodes['Cube 6'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[139.49, -2.99, -83.54]}
              rotation={[-Math.PI, 0, -Math.PI / 2]}
              scale={1}
              onClick={moveSettings}
            />
            <mesh
              name="Cube 72"
              geometry={nodes['Cube 72'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[-139.92, -46.3, -3.35]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
              onClick={moveSettings}
            />
            <mesh
              name="Cube 5"
              geometry={nodes['Cube 5'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[139.55, -46.3, -5.06]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
              onClick={moveSettings}
            />
            <mesh
              name="Cube 42"
              geometry={nodes['Cube 42'].geometry}
              material={materials['blue-a-2']}
              castShadow
              receiveShadow
              position={[0, 2.04, 0]}
              rotation={[-1.13, 0, -Math.PI / 2]}
              scale={1}
              onClick={moveSettings}
            />
          </group>
          <group
            name="?????????"
            position={[741.18, -210.11, -448.64]}
            rotation={[0, -1.04, 0]}
            scale={1.04}>
            <mesh
              name="Rectangle 7"
              geometry={nodes['Rectangle 7'].geometry}
              material={materials['ui-2']}
              castShadow
              receiveShadow
              position={[-13.24, -26.64, 27.86]}
              scale={[1, 0.86, 0.86]}
            />
            <mesh
              name="Rectangle 62"
              geometry={nodes['Rectangle 62'].geometry}
              material={materials['main1-1']}
              castShadow
              receiveShadow
              position={[-29.52, -26.64, 27.86]}
              scale={[1, 0.86, 0.86]}
            />
            <mesh
              name="Rectangle 51"
              geometry={nodes['Rectangle 51'].geometry}
              material={materials['blue-1-3']}
              castShadow
              receiveShadow
              position={[-19.57, -8.38, 30.13]}
              rotation={[0, 0, 0]}
              scale={[1.07, 0.86, 0.86]}
            />
            <mesh
              name="Rectangle 42"
              geometry={nodes['Rectangle 42'].geometry}
              material={materials['blue-1-3']}
              castShadow
              receiveShadow
              position={[-23.8, 1.4, 30.13]}
              rotation={[0, 0, 0]}
              scale={[1.07, 0.86, 0.86]}
            />
            <mesh
              name="Rectangle 31"
              geometry={nodes['Rectangle 31'].geometry}
              material={materials['blue-1-3']}
              castShadow
              receiveShadow
              position={[-23.8, 10.72, 30.13]}
              rotation={[0, 0, 0]}
              scale={[1.07, 0.86, 0.86]}
            />
            <mesh
              name="Rectangle 21"
              geometry={nodes['Rectangle 21'].geometry}
              material={materials['blue-1-3']}
              castShadow
              receiveShadow
              position={[-19.57, 20.42, 30.13]}
              rotation={[0, 0, 0]}
              scale={[1.07, 0.86, 0.86]}
            />
            <mesh
              name="Sphere1"
              geometry={nodes.Sphere1.geometry}
              material={materials['blue-b-1']}
              castShadow
              receiveShadow
              position={[27.37, 6.46, 33.71]}
            />
            <mesh
              name="Cylinder 3"
              geometry={nodes['Cylinder 3'].geometry}
              material={materials['blue-1-1']}
              castShadow
              receiveShadow
              position={[34.86, -26.49, 29.77]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={1}
            />
            <mesh
              name="Cylinder 2"
              geometry={nodes['Cylinder 2'].geometry}
              material={materials['blue-1-1']}
              castShadow
              receiveShadow
              position={[15.68, -26.49, 29.77]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={1}
            />
            <mesh
              name="Cylinder"
              geometry={nodes.Cylinder.geometry}
              material={materials['blue-1-3']}
              castShadow
              receiveShadow
              position={[27.39, 6.26, 30.13]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={1}
            />
            <mesh
              name="Cube 2"
              geometry={nodes['Cube 2'].geometry}
              material={materials.purple}
              castShadow
              receiveShadow
              position={[0, -4.01, -4.08]}
            />
          </group>
          <group
            name="??????"
            position={[635.8, -219.34, 698.82]}
            rotation={[0, -Math.PI / 3, 0]}
            scale={1.52}>
            <mesh
              name="Cube 51"
              geometry={nodes['Cube 51'].geometry}
              material={materials['Cube 51 Material']}
              castShadow
              receiveShadow
              position={[-9.04, 12.19, 0.73]}
              rotation={[-Math.PI, 0, 2.71]}
              scale={1}
            />
            <mesh
              name="Cube 43"
              geometry={nodes['Cube 43'].geometry}
              material={materials['Cube 43 Material']}
              castShadow
              receiveShadow
              position={[5.49, 46.53, -1.34]}
              rotation={[-0.05, 0.01, -0.13]}
              scale={1}
            />
            <mesh
              name="Cube 3"
              geometry={nodes['Cube 3'].geometry}
              material={materials['Cube 3 Material']}
              castShadow
              receiveShadow
              position={[7.82, 68.33, -2.54]}
              rotation={[0, 0, 0.05]}
              scale={1}
            />
            <mesh
              name="Cube 21"
              geometry={nodes['Cube 21'].geometry}
              material={materials['Cube 21 Material']}
              castShadow
              receiveShadow
              position={[-1.09, -85.49, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={1}
            />
          </group>
          <group name="cd-2" position={[637.14, -589.39, 708.33]}>
            <mesh
              name="Cube 31"
              geometry={nodes['Cube 31'].geometry}
              material={materials['blue-a-2']}
              castShadow
              receiveShadow
              position={[19.06, -84.98, 74.49]}
              rotation={[Math.PI / 2, -Math.PI / 2, 0]}
              scale={1}
            />
            <mesh
              name="Cube 22"
              geometry={nodes['Cube 22'].geometry}
              material={materials['blue-a-2']}
              castShadow
              receiveShadow
              position={[-1.65, -21.84, -37.69]}
              rotation={[-0.09, -Math.PI / 2, 0]}
              scale={1}
            />
            <mesh
              name="Cube1"
              geometry={nodes.Cube1.geometry}
              material={materials['blue-1-3']}
              castShadow
              receiveShadow
              position={[-8.36, -3.84, -108.49]}
              rotation={[0, -Math.PI / 2, 0]}
            />
            <group name="Group 19" position={[6.89, 10.69, 22.42]}>
              <mesh
                name="Ellipse 2"
                geometry={nodes['Ellipse 2'].geometry}
                material={materials['blue-1-1']}
                castShadow
                receiveShadow
                position={[-3.29, 7.18, 12.66]}
                rotation={[-0.59, -0.18, -1.73]}
                scale={0.77}
              />
              <mesh
                name="Cube 23"
                geometry={nodes['Cube 23'].geometry}
                material={materials['blue-1-3']}
                castShadow
                receiveShadow
                position={[0, 0, 0]}
                rotation={[-0.59, -0.18, -0.16]}
                scale={0.77}
              />
            </group>
          </group>
          <group
            name="?????????"
            position={[481.82, -224.36, -251.16]}
            rotation={[0.04, 0, -0.12]}
            scale={1}>
            <group
              name="Group 50"
              position={[-38.67, 10.21, 105.47]}
              rotation={[-0.08, 0.47, -1.6]}
              scale={0.84}>
              <mesh
                name="Rectangle 32"
                geometry={nodes['Rectangle 32'].geometry}
                material={materials['Rectangle 32 Material']}
                castShadow
                receiveShadow
                position={[-1.2, -0.12, 15.36]}
              />
              <mesh
                name="Rectangle 22"
                geometry={nodes['Rectangle 22'].geometry}
                material={materials['Rectangle 22 Material']}
                castShadow
                receiveShadow
                position={[-1.2, -0.12, 8.51]}
              />
              <mesh
                name="Cube2"
                geometry={nodes.Cube2.geometry}
                material={materials['Cube2 Material']}
                castShadow
                receiveShadow
                position={[0, 0, -7.36]}
              />
            </group>
            <group
              name="Group 51"
              position={[-111.24, 1.41, -9.91]}
              rotation={[3.07, -0.73, 1.6]}
              scale={0.84}>
              <mesh
                name="Rectangle 33"
                geometry={nodes['Rectangle 33'].geometry}
                material={materials['Rectangle 33 Material']}
                castShadow
                receiveShadow
                position={[-1.2, -0.12, 15.36]}
              />
              <mesh
                name="Rectangle 23"
                geometry={nodes['Rectangle 23'].geometry}
                material={materials['Rectangle 23 Material']}
                castShadow
                receiveShadow
                position={[-1.2, -0.12, 8.51]}
              />
              <mesh
                name="Cube3"
                geometry={nodes.Cube3.geometry}
                material={materials['Cube3 Material']}
                castShadow
                receiveShadow
                position={[0, 0, -7.36]}
              />
            </group>
            <mesh
              name="Cylinder 21"
              geometry={nodes['Cylinder 21'].geometry}
              material={materials['Cylinder 21 Material']}
              castShadow
              receiveShadow
              position={[-108.14, 0.25, -37.35]}
              rotation={[-1.66, 0.02, -0.76]}
              scale={1.2}
            />
            <mesh
              name="Cylinder1"
              geometry={nodes.Cylinder1.geometry}
              material={materials['Cylinder1 Material']}
              castShadow
              receiveShadow
              position={[-14.86, 11.43, 113.34]}
              rotation={[-1.66, 0.02, -1.19]}
              scale={1.2}
            />
            <mesh
              name="Torus"
              geometry={nodes.Torus.geometry}
              material={materials['Torus Material']}
              castShadow
              receiveShadow
              position={[-46.36, 3.62, 28.47]}
              rotation={[-1.66, 0.02, -2.59]}
              scale={[1.26, 1.2, 1.2]}
            />
          </group>
          <group
            name="?????????"
            position={[619.15, -528.41, 711.6]}
            scale={[1, 1, 0.93]}>
            <mesh
              name="Cube 10"
              geometry={nodes['Cube 10'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[153.32, -19.95, -182.84]}
              rotation={[-Math.PI / 2, Math.PI / 2, 0]}
              scale={[1.07, 1, 1]}
            />
            <mesh
              name="Cube 8"
              geometry={nodes['Cube 8'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[153.32, -19.95, 175.5]}
              rotation={[-Math.PI / 2, Math.PI / 2, 0]}
              scale={[1.07, 1, 1]}
            />
            <mesh
              name="Cube 101"
              geometry={nodes['Cube 101'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[-152.28, -19.95, -182.84]}
              rotation={[-Math.PI / 2, Math.PI / 2, 0]}
              scale={[1.07, 1, 1]}
            />
            <mesh
              name="Cube 73"
              geometry={nodes['Cube 73'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[-152.28, -19.95, 175.5]}
              rotation={[-Math.PI / 2, Math.PI / 2, 0]}
              scale={[1.07, 1, 1]}
            />
            <mesh
              name="Cube 12"
              geometry={nodes['Cube 12'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[154.21, -149.51, 4.45]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={[1.32, 1, 1]}
            />
            <mesh
              name="Cube 11"
              geometry={nodes['Cube 11'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[-151.03, -149.51, 4.45]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={[1.32, 1, 1]}
            />
            <mesh
              name="Cube 102"
              geometry={nodes['Cube 102'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[3.75, -149.51, -182.84]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[1.25, 1, 1]}
            />
            <mesh
              name="Cube 9"
              geometry={nodes['Cube 9'].geometry}
              material={materials['main-3']}
              castShadow
              receiveShadow
              position={[3.75, -149.51, 175.56]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[1.25, 1, 1]}
            />
            <mesh
              name="Cube 52"
              geometry={nodes['Cube 52'].geometry}
              material={materials['bule-b-2']}
              castShadow
              receiveShadow
              position={[0, 131.01, -3.46]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group
            name="?????? - ?????? ??????"
            position={[547.09, -552.18, -478.18]}
            rotation={[0, -1.48, 0]}
            scale={[2.25, 2.26, 2.26]}>
            <mesh
              name="Rectangle 9"
              geometry={nodes['Rectangle 9'].geometry}
              material={materials['Rectangle 9 Material']}
              castShadow
              receiveShadow
              position={[57.6, -29.15, -12]}
              rotation={[0, Math.PI / 2, 0]}
              scale={1}
            />
            <mesh
              name="Cube4"
              geometry={nodes.Cube4.geometry}
              material={materials['blue-1-3']}
              castShadow
              receiveShadow
              position={[-0.69, -0.53, -1.41]}
              scale={0.78}
            />
          </group>
          <group
            name="?????? - ?????? ??????"
            position={[-650.29, -551.73, -670.1]}
            rotation={[-Math.PI, -Math.PI / 9, -Math.PI]}
            scale={2.25}>
            <mesh
              name="Rectangle 91"
              geometry={nodes['Rectangle 91'].geometry}
              material={materials['blue-a-2']}
              castShadow
              receiveShadow
              position={[57.27, -20.82, 18.72]}
              rotation={[0, Math.PI / 2, 0]}
              scale={1}
            />
            <mesh
              name="Cube 24"
              geometry={nodes['Cube 24'].geometry}
              material={materials.purple}
              castShadow
              receiveShadow
              position={[-0.69, 56.09, -1.41]}
              scale={0.74}
            />
            <mesh
              name="Cube5"
              geometry={nodes.Cube5.geometry}
              material={materials['Cube5 Material']}
              castShadow
              receiveShadow
              position={[-0.69, -0.53, -1.41]}
              scale={0.78}
            />
          </group>
          <group
            name="??????"
            position={[-716.04, -58.57, -739.77]}
            rotation={[-0.25, 0.21, 0.2]}
            scale={1.09}>
            <mesh
              name="Ellipse"
              geometry={nodes.Ellipse.geometry}
              material={materials['Ellipse Material']}
              castShadow
              receiveShadow
              position={[-1.37, -178.62, 13.24]}
              rotation={[0, 0.04, 0.16]}
              scale={[1, 1, 0.86]}
              onClick={changeBgmNo}
            />
            <mesh
              name="Shape 4"
              geometry={nodes['Shape 4'].geometry}
              material={materials.purple}
              castShadow
              receiveShadow
              position={[-27.71, -266.66, 4.48]}
              onClick={changeBgmNo}
            />
            <mesh
              name="Shape 3"
              geometry={nodes['Shape 3'].geometry}
              material={materials.purple}
              castShadow
              receiveShadow
              position={[-25.83, -106.07, 3.57]}
              rotation={[0, 0, 0]}
              scale={1}
              onClick={changeBgmNo}
            />
            <mesh
              name="Shape 2"
              geometry={nodes['Shape 2'].geometry}
              material={materials['Shape 2 Material']}
              castShadow
              receiveShadow
              position={[-82, -132.42, -38.9]}
              onClick={changeBgmNo}
            />
          </group>
          <group
            name="?????? ?????????"
            position={[711.32, 377.98, 79.98]}
            rotation={[0, -Math.PI / 2, 0]}
            scale={[0.79, 0.66, 0.07]}>
            <mesh
              name="Rectangle 34"
              geometry={nodes['Rectangle 34'].geometry}
              material={materials['Rectangle 34 Material']}
              castShadow
              receiveShadow
              position={[-70.57, 1.3, -1440.14]}
              onClick={moveMap}
            />
            <mesh
              name="Rectangle 24"
              geometry={nodes['Rectangle 24'].geometry}
              material={materials['Rectangle 24 Material']}
              castShadow
              receiveShadow
              position={[-73.17, 0, -1470.57]}
              onClick={moveMap}
            />
          </group>
          <group name="??????" position={[-43.23, 255.29, -833.02]}>
            <mesh
              name="Cube 44"
              geometry={nodes['Cube 44'].geometry}
              material={materials['blue-a-2']}
              castShadow
              receiveShadow
              position={[0.63, 0.94, -10.81]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={1}
            />
            <mesh
              name="Cube 53"
              geometry={nodes['Cube 53'].geometry}
              material={materials['blue-a-2']}
              castShadow
              receiveShadow
              position={[1.69, 105.58, 0]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={1}
            />
            <mesh
              name="??????"
              geometry={nodes.??????.geometry}
              material={materials['?????? Material']}
              castShadow
              receiveShadow
              position={[0, -198.5, 9.16]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group name="??????" position={[566.56, -470.16, -221.28]} scale={0.7}>
            <mesh
              name="Cube 32"
              geometry={nodes['Cube 32'].geometry}
              material={materials['table-ao']}
              castShadow
              receiveShadow
              position={[231.35, -29.75, -676.32]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1.42}
            />
            <mesh
              name="Cube 33"
              geometry={nodes['Cube 33'].geometry}
              material={materials['table-ao']}
              castShadow
              receiveShadow
              position={[-249.64, -29.75, -676.32]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1.42}
            />
            <mesh
              name="Cube 25"
              geometry={nodes['Cube 25'].geometry}
              material={materials['table-ao']}
              castShadow
              receiveShadow
              position={[231.35, -29.75, 886.09]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1.42}
            />
            <mesh
              name="Cube6"
              geometry={nodes.Cube6.geometry}
              material={materials['table-ao']}
              castShadow
              receiveShadow
              position={[-249.64, -29.75, 886.09]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1.42}
            />
            <mesh
              name="Rectangle1"
              geometry={nodes.Rectangle1.geometry}
              material={materials['Rectangle1 Material']}
              castShadow
              receiveShadow
              position={[0, 230.16, 109]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={1}
            />
          </group>
          <group
            name="?????????"
            position={[-256.11, -681.27, 145.27]}
            scale={0.96}>
            <mesh
              name="Ellipse 3"
              geometry={nodes['Ellipse 3'].geometry}
              material={materials['Ellipse 3 Material']}
              castShadow
              receiveShadow
              position={[0, 10.56, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[1.09, 1.09, 1.66]}
            />
            <mesh
              name="Ellipse 21"
              geometry={nodes['Ellipse 21'].geometry}
              material={materials['Ellipse 21 Material']}
              castShadow
              receiveShadow
              position={[0, 7.39, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={[1.09, 1.09, 1.66]}
            />
            <mesh
              name="Ellipse1"
              geometry={nodes.Ellipse1.geometry}
              material={materials['Ellipse1 Material']}
              castShadow
              receiveShadow
              position={[0, -7.39, 0]}
              rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
              scale={[1.09, 1.09, 1.66]}
            />
          </group>
        </group>
        <PerspectiveCamera
          name="1"
          makeDefault={true}
          far={100000}
          near={100}
          fov={45}
          position={[-3464.2, 2872.21, 3531.06]}
          rotation={[-0.68, -0.65, -0.46]}
          scale={1}
        />
        <hemisphereLight
          name="Default Ambient Light"
          intensity={0.75}
          color="#eaeaea"
        />
      </group>
    </>
  );
}
