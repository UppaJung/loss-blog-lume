import { SurveyKeys, AugmentedSurveyResponses } from "../SurveyResponse.ts";
import { makeSafeForMarkdown } from "./common/makeSafeForMarkdown.ts";

export const generateLossStoryMarkdown = (outPath: string, responses: AugmentedSurveyResponses) => {
		const losses = `# Loss Stories${"\n\n"}` + responses.map( 
			response => `### Participant ${response.participantId}${"\n"}` + [SurveyKeys.Loss1, SurveyKeys.Loss2, SurveyKeys.Loss3].map( (key, index) => 
				`${index + 1}. ${makeSafeForMarkdown(response[key])}${"\n"}`).join("\n")
		).join("\n");
    Deno.writeTextFileSync(`${outPath}/loss-stories.md`, losses);
  }
;
