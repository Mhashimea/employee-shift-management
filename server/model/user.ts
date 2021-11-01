import {
  AllowNull, AutoIncrement, Column, Model, NotEmpty, PrimaryKey, Table
} from "sequelize-typescript"


export interface UserI {
  id: number | null
  fullName: string
  phone: string
  email: string
  active: boolean
}

@Table({
  tableName: "user",
  timestamps: true,
})
export default class User extends Model implements UserI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number

  @AllowNull(false)
  @NotEmpty
  @Column
  fullName!: string

  @AllowNull(false)
  @NotEmpty
  @Column
  email!: string

  @AllowNull(false)
  @Column
  phone!: string

  @AllowNull(true)
  @Column
  dateOfJoin!: Date

  @AllowNull(true)
  @NotEmpty
  @Column
  active!: boolean
}