import { useCallback, useEffect, useRef } from 'react';
import { ReqAddMarker } from '../app/page';

const DEBOUNCE_DELAY = 300;

type UseMapCenterOptions = {
  addMode: boolean; //추가 모드인지에 대한 불리언
  onChange: (item: ReqAddMarker) => void;
};

export const useMapCenter = ({ addMode, onChange }: UseMapCenterOptions) => {
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const geocoderRef = useRef<kakao.maps.services.Geocoder | null>(null);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  const onCenterChanged = useCallback((map: kakao.maps.Map) => {
    if (!addMode) return;

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
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
        onChange({ lat: center.getLat(), lng: center.getLng(), name, address });
      });
    }, DEBOUNCE_DELAY);
  }, [addMode, onChange]);

  return { onCenterChanged };
};
