import {
  AllowNull, AutoIncrement, Column, Model, NotEmpty, PrimaryKey, Table
} from "sequelize-typescript"


export interface ShiftMasterI {
  id: number | null
  code: string
  name: string
  description: string
  startTime: string
  endTime: string
  breakStartTime: string
  breakEndTime: string
  totalHrs: string
  totalBreakHrs: string
  active: boolean
}

@Table({
  tableName: "shiftMaster",
  timestamps: true,
})
export default class ShiftMaster extends Model implements ShiftMasterI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number

  @AllowNull(false)
  @NotEmpty
  @Column
  code!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  name!: string

  @AllowNull(true)
  @Column
  description!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  startTime!: string

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

  @AllowNull(true)
  @NotEmpty
  @Column
  active!: boolean
}