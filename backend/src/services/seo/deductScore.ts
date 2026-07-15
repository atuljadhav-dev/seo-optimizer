import { SEO_PENALTY } from '../../constants/seoPenalty.js';
export const deductScore = (
	score: number,

	severity: 'low' | 'medium' | 'high',
) => {
	switch (severity) {
		case 'low':
			return Math.max(score - SEO_PENALTY.LOW, 0);

		case 'medium':
			return Math.max(score - SEO_PENALTY.MEDIUM, 0);

		case 'high':
			return Math.max(score - SEO_PENALTY.HIGH, 0);
	}
};
