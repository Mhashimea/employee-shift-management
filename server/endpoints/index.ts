import addOrUpdateHoliday from './holiday/addOrUpdateHoliday'
import getHoliday from './holiday/getHoliday'
import addOrUpdateShiftDetail from './shift/addOrUpdateShiftDetail'
import getShiftById from './shift/getShiftById'
import getShiftDetails from './shift/getShiftDetails'
import addOrUpdateShiftAssignment from './shiftAssignment/addOrUpdateShiftAssignment'
import getShiftAssignment from './shiftAssignment/getShiftAssignment'
import getShiftDetailsByUser from './shiftAssignment/getShiftDetailsByUser'
import addOrUpdateUser from './user/addOrUpdateUser'
import getUsers from './user/getUsers'

const BASEURL = "/api"

export default (app) => {
  app.get(`${BASEURL}/users`, getUsers)
  app.post(`${BASEURL}/add-user`, addOrUpdateUser)

  app.get(`${BASEURL}/holidays`, getHoliday)
  app.post(`${BASEURL}/add-holiday`, addOrUpdateHoliday)

  app.get(`${BASEURL}/shifts`, getShiftDetails)
  app.post(`${BASEURL}/add-shift`, addOrUpdateShiftDetail)
  app.post(`${BASEURL}/get-shift-byId`, getShiftById)

  app.get(`${BASEURL}/shift-assignments`, getShiftAssignment)
  app.post(`${BASEURL}/assign-shift`, addOrUpdateShiftAssignment)
  app.post(`${BASEURL}/get-shift-by-user`, getShiftDetailsByUser)
}