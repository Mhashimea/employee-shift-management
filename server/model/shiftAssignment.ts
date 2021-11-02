import {
  AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, NotEmpty, PrimaryKey, Table
} from "sequelize-typescript"
import ShiftMaster from './shiftMaster'
import User from './user'


export interface ShiftAssignmentI {
  id: number | null
  shiftMasterId: number
  employeeId: number
  startDate: Date
  endDate: Date
}

@Table({
  tableName: "shiftAssignment",
  timestamps: true,
})
export default class ShiftAssignment extends Model implements ShiftAssignmentI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number

  @AllowNull(false)
  @ForeignKey(() => ShiftMaster)
  @NotEmpty
  @Column
  shiftMasterId!: number

  @AllowNull(false)
  @ForeignKey(() => User)
  @NotEmpty
  @Column
  employeeId!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  startDate!: Date

  @AllowNull(false)
  @NotEmpty
  @Column
  endDate!: Date

  @BelongsTo(() => ShiftMaster)
  shiftDetails: ShiftMaster

  @BelongsTo(() => User)
  userDetails: User
}