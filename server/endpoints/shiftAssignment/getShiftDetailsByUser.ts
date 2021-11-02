import Holiday from '../../model/holiday';
import ShiftAssignment from '../../model/shiftAssignment';

export default async (req, res) => {
  try {
    let data = [];
    const { employeeId } = req.body;
    console.log(req.body);
    if (employeeId) {
      const shiftAssignments = await ShiftAssignment.findAll({
        where: {
          employeeId,
        },
        include: ['shiftDetails', 'userDetails'],
      });

      for (let i = 0; i < shiftAssignments.length; i++) {
        const shiftDetails = shiftAssignments[i];
        data.push({
          type: 'SHIFT',
          start: shiftDetails.startDate,
          end: shiftDetails.endDate,
          employee: shiftDetails.userDetails,
          shiftDetails: shiftDetails.shiftDetails,
        });
      }
    }
    const holidays = await Holiday.findAll();

    for (let j = 0; j < holidays.length; j++) {
      const holidaysDetails = holidays[j];
      data.push({
        type: 'HOLIDAY',
        name: holidaysDetails.name,
        start: holidaysDetails.startDate,
        end: holidaysDetails.endDate,
      });
    }

    return res.status(200).json({ success: true, data: data });
  } catch (e) {
    return res.status(500).json({ success: false, data: e.message });
  }
};
