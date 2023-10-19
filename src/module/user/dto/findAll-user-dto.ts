import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsInt, IsOptional } from "class-validator";
import { ordering } from "src/common/enums/ordering.enum";
import { orderBy } from "../enum/orderBy.enum";


export class FindAllUserDto{
    @ApiProperty({required:false})
    @IsOptional()
    @IsInt()
    page:number
 
    @ApiProperty({required:false})
    @IsOptional()
    @IsInt()
    limit:number

    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(ordering)
    ordering:ordering

    @ApiProperty({required:false})
    @IsOptional()
    @IsEnum(orderBy)
    orderBy:orderBy

    @ApiProperty({required:false})
    @IsOptional()
    @IsDate()
    startDate:Date

    @ApiProperty({required:false})
    @IsOptional()
    @IsDate()
    endDate:Date


}