import { getZoneCounter, getAllZoneData, useAppDispatch, useAppSelector } from '../../utils/hooks';
import { addZone } from './zoneSlice';

export const CreateZoneList = () => {
  const dispatch = useAppDispatch();
  let zoneCount = useAppSelector(getZoneCounter);
  const zoneData = useAppSelector(getAllZoneData);

    if (zoneCount === 0 ) {
      zoneCount = zoneData.features.length;
    }

    for (let i = 0; i < zoneCount; i++) {
      dispatch(addZone(zoneData.features[i]));
    }
};
