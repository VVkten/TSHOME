export class AdResponseDto {
  _id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  _links: {
    self: { href: string };
    all: { href: string };
    schema: { href: string };
  };

  constructor(ad: any, baseUrl: string) {
    this._id = ad._id;
    this.name = ad.name;
    this.description = ad.description;
    this.createdAt = ad.createdAt;
    this.updatedAt = ad.updatedAt;
    this._links = {
      self: { href: `${baseUrl}/ads/${ad._id}` },
      all: { href: `${baseUrl}/ads` },
      schema: { href: `${baseUrl}/ads/schema` },
    };
  }
}
