import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { UserRole } from "src/common/enums/userRole-enum";


export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name:string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password:string
    @ApiProperty({default:UserRole.user})
    @IsEnum(UserRole)
    @IsNotEmpty()
    role:UserRole
}
