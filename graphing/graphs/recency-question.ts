import { chart } from "https://deno.land/x/fresh_charts@0.3.1/core.ts";
import { ChartColors, transparentize } from "https://deno.land/x/fresh_charts@0.3.1/utils.ts";
import { AnswerToRecencyQuestion, AnswerToRecencyQuestionList } from "../../analysis-src/decode-questions/recency-question.ts";

// const RANGE = {count: 3, min: -30, max: 30};

export const graphScenarioRecencyBarChart = (outputPath: string, labels: string[], data: Record<AnswerToRecencyQuestion, readonly number[]>) => {
	const datasets = AnswerToRecencyQuestionList.map( (answer, index) => {
		const color = [ChartColors.Red, ChartColors.Orange, ChartColors.Blue, ChartColors.Green, ChartColors.Purple, ChartColors.Grey][index];
		return {
			label: answer,
			data: data[answer],
			borderColor: color,
			backgroundColor: transparentize(color, 0.5),
			// stack: `stack ${index}`,
		} as const;
	});
	Deno.writeTextFileSync(`${outputPath}/scenario-recency-bar-chart.svg`, chart({
		type: "bar", height: 400, width: 800,
		data: {
			labels: labels, datasets,
		},
		options: {
			devicePixelRatio: 1,
			scales: {
				x: { stacked: true },
				y: { beginAtZero: true, stacked: true }
			},
		},
	}));
};