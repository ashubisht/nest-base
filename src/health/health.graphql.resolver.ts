import { Query, Resolver } from "@nestjs/graphql";

@Resolver("HealthResolver")
export class GraphQLHealthResolver {

  @Query(returns => String)
  async generateheathreport(): Promise<string>{
    return "GraphQL interface is up!";
  }

}