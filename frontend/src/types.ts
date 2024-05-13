import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
export class Country {
    @Field()
    name: string;

    @Field()
    emoji: string;

    @Field()
    code: string;

    @Field(() => Continent)
    continent: Continent;
}

@ObjectType()
export class Continent {
    @Field()
    name: string;
}

@InputType()
export class NewCountryInput {
    @Field()
    name: string;

    @Field()
    emoji: string;

    @Field()
    code: string;
}