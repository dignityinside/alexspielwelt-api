import { Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  getHello(): string {
    return 'It works.';
  }

  /**
   * Generate slug by e.q. title
   * @param name
   */
  async generateSlugBy(name: string): Promise<string> {
    return slugify(name, { lower: true, strict: true })
  }

  /**
   * Returns unique slug
   * @param repository
   * @param fieldName
   * @param baseValue
   */
  async generateUniqueSlug<T>(
    repository: Repository<T>,
    fieldName: string,
    baseValue: string
  ): Promise<string> {
    let uniqueValue = baseValue;
    let counter = 1;

    while (await repository.createQueryBuilder('entity')
      .where(`entity.${fieldName} = :value`, { value: uniqueValue })
      .getOne()) {
      uniqueValue = `${baseValue}-${counter}`;
      counter++;
    }

    return uniqueValue;
  }
}
