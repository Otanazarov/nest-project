import { RootEntity } from 'src/common/entity/root.entity';
import { UserRole } from 'src/common/enums/userRole-enum';
import { Column, Entity } from 'typeorm';
@Entity()
export class User extends RootEntity {
  @Column()
  name: string;

  @Column({ enum: UserRole, default: UserRole.user, type: 'enum' })
  role: UserRole;

  @Column({ unique: true })
  email: string;
  @Column()
  password:string
  
  @Column({ default: false })
  loggedOut: boolean;
}
