import { useSelector, useDispatch } from 'react-redux'
import { getZoneCounter, getAllZoneData } from '../../store'
import { addZone } from './zoneSlice'

export const CreateZoneList = () => {
    const dispatch = useDispatch()
    const zoneCount = useSelector(getZoneCounter)
    const zoneData = useSelector(getAllZoneData)

    for (const elem of zoneData.features) {
        if (elem.properties._id < zoneCount) {
            dispatch({ type: addZone.type, payload: elem })
        } else {
            break
        }
    }
}
