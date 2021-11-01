import {
  AllowNull, AutoIncrement, Column, HasMany, Model, NotEmpty, PrimaryKey, Table
} from "sequelize-typescript"
import ShiftDetails from './shiftDetails'


export interface ShiftMasterI {
  id: number | null
  code: string
  name: string
  description: string
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

  @AllowNull(true)
  @NotEmpty
  @Column
  active!: boolean

  @HasMany(() => ShiftDetails)
  shiftDetails: ShiftDetails[]
}