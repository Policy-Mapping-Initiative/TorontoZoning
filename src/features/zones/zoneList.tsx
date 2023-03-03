import { getZoneCounter, getAllZoneData, useAppDispatch, useAppSelector } from '../../hooks';
import { addZone } from './zoneSlice';

export const CreateZoneList = () => {
  const dispatch = useAppDispatch();
  const zoneCount = useAppSelector(getZoneCounter);
  const zoneData = useAppSelector(getAllZoneData);

  for (const elem of zoneData.features) {
    if (elem.properties._id < zoneCount) {
      dispatch(addZone(elem));
    } else {
      break;
    }
  }
};
