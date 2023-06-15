import { Type } from 'class-transformer';
import { IsInt, IsNotEmptyObject, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { EntityReference } from '../../types/index';

export class CreateSkin {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  tier: number;

  @ValidateNested()
  @Type(() => EntityReference)
  @IsNotEmptyObject()
  type: EntityReference;
}

export class UpdateSkin {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  tier: number;
}
