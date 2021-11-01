import {
  AllowNull, AutoIncrement, Column, Model, NotEmpty, PrimaryKey, Table
} from "sequelize-typescript"


export interface HolidayI {
  id: number | null
  name: string
  code: string
  startDate: Date
  endDate: Date
  active: boolean
}

@Table({
  tableName: "holiday",
  timestamps: true,
})
export default class Holiday extends Model implements HolidayI {
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

  @AllowNull(false)
  @Column
  startDate!: Date

  @AllowNull(false)
  @Column
  endDate!: Date

  @AllowNull(false)
  @NotEmpty
  @Column
  active!: boolean
}