import { useCallback, useEffect, useRef } from 'react';
import { ReqAddMarker } from '../app/page';

const DEBOUNCE_DELAY = 300;

type UseMapCenterOptions = {
  map: kakao.maps.Map | null; // 지도 인스턴스
  addMode: boolean; //추가 모드인지에 대한 불리언
  onChange: (item: ReqAddMarker) => void;
};

export const useMapCenter = ({ map, addMode, onChange }: UseMapCenterOptions) => {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const geocoderRef = useRef<kakao.maps.services.Geocoder | null>(null);

  // onChange 가 렌더마다 새로 만들어져도 effect 가 반복 실행되지 않도록 ref 로 보관
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // 지도 중심 좌표를 주소로 변환해서 전달
  const resolveCenter = useCallback((map: kakao.maps.Map) => {
    // geocoder 객체 생성
    if (!geocoderRef.current) {
      geocoderRef.current = new kakao.maps.services.Geocoder();
    }

    // 지도 중심 좌표
    const center = map.getCenter();

    // 좌표를 주소로 반환
    geocoderRef.current.coord2Address(center.getLng(), center.getLat(), (result, status) => {
      if (status !== window.kakao.maps.services.Status.OK || !result[0]) return;

      const name = result[0].road_address?.building_name || result[0].address.address_name;
      const address = result[0].address.address_name;
      onChangeRef.current({ lat: center.getLat(), lng: center.getLng(), name, address });
    });
  }, []);

  // 추가 모드 진입 시 지도를 움직이지 않아도 현재 중심 위치를 바로 계산
  // 추가 모드 종료 시 대기 중인 디바운스 취소
  useEffect(() => {
    if (addMode && map) resolveCenter(map);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [addMode, map, resolveCenter]);

  const onCenterChanged = useCallback((map: kakao.maps.Map) => {
    if (!addMode) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => resolveCenter(map), DEBOUNCE_DELAY);
  }, [addMode, resolveCenter]);

  return { onCenterChanged };
};
