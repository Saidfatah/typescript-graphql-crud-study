import { Mutation, Resolver,Arg, Int, Query, InputType, Field } from "type-graphql";
import { Movie } from "../entity/Movie";


@InputType()
class MovieUpdateInput {
    @Field(()=>String,{nullable:true})
    title?:string;

    @Field(()=>Int,{nullable:true})
    minutes?: number;
} 

@Resolver()
export class MovieResolver {
  @Mutation(() => Movie )
  async createMovie(
      @Arg("title",()=>String,{nullable:true,defaultValue:"title"}) title:string,
      @Arg("minutes",()=>Int) minutes:number,
  ) {
     const movie = await Movie.create({title,minutes}).save()
    return movie;
  }
  @Mutation(() => Boolean )
  async deleteMovie(
    @Arg("id",()=>Int) id:number,
  ) {
     await Movie.delete({id})
    return true;
  }
  @Mutation(() => Boolean )
  async updateMovie(
      @Arg("id",()=>Int) id:number,
      @Arg("options",()=>MovieUpdateInput) options:MovieUpdateInput,
  ) {
    await Movie.update({ id },options)
    return true;
  }

  @Query(()=>[Movie])
  movies(){
    return Movie.find({})
  }
}
