export function getIndicators({
    hasDescription,
    commentsCount,
    filesCount,
    totalTimeTracked
}) {
    const indicators = []
    if (hasDescription) {
        indicators.push({name: 'description'})
    }
    if (commentsCount > 0) {
        indicators.push({name: 'chat'})
    }
    if (filesCount > 0) {
        indicators.push({name: 'attach'})
    }
    if (totalTimeTracked > 0) {
        indicators.push({name: 'timer'})
    }
    return indicators
}

export { default as rateLimit } from './rate-limit'