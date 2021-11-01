import {
  AllowNull, AutoIncrement, BelongsTo, Column, ForeignKey, Model, NotEmpty, PrimaryKey, Table
} from "sequelize-typescript"
import ShiftMaster from './shiftMaster'


export interface ShiftDetailsI {
  id: number | null
  shiftMasterId: number
  dayName: string
  startTime: string
  endTime: string
  breakStartTime: string
  breakEndTime: string
  totalHrs: string
  totalBreakHrs: string
  active: boolean
}

@Table({
  tableName: "shiftDetails",
  timestamps: true,
})
export default class ShiftDetails extends Model implements ShiftDetailsI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number

  @AllowNull(false)
  @ForeignKey(() => ShiftMaster)
  @Column
  shiftMasterId!: number

  @AllowNull(false)
  @NotEmpty
  @Column
  startTime!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  dayName!: string

  @AllowNull(false)
  @Column
  endTime!: string

  @AllowNull(false)
  @Column
  breakStartTime!: string

  @AllowNull(false)
  @Column
  breakEndTime!: string

  @AllowNull(false)
  @Column
  totalHrs!: string

  @AllowNull(false)
  @Column
  totalBreakHrs!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  active!: boolean
}