export const reversedBitFieldToInt = bits =>bits.reduce((sum, bit, i) => (bit ? sum + 2 ** i : sum), 0)

