package com.atlantbh.internship.auction.app.service.featured.search;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public final class SearchSuggestion {

    /**
     * @param searchList  List of strings to compare input string to
     * @param inputString Value to compare to the list of strings
     * @return A {@link List} of strings,
     * ordered by their similarity to the input string or an empty list if the input string is blank.
     * If the similarity coefficient of list member and input string is below 0,
     * that list member is not included in the return result.
     */
    public List<String> createSearchSuggestion(final List<String> searchList, final String inputString) {
        // If input is null, set it to empty string, else trim it to avoid NullPointerException
        // To avoid case sensitivity and improve time complexity, convert the input string to lowercase
        final String inputValue = StringUtils.trimToEmpty(inputString).toLowerCase();

        if (StringUtils.isBlank(inputValue)) {
            return Collections.emptyList();
        }

        final Map<String, Integer> similarityScoreTable = new HashMap<>(searchList.size());
        searchList.stream()
                .map(StringUtils::trimToEmpty)
                .map(String::toLowerCase)
                .filter(comparativeValue -> !comparativeValue.isEmpty() && !similarityScoreTable.containsKey(comparativeValue))
                .forEach(comparativeValue -> {
                    final int similarityScore = calculateSimilarity(inputValue, comparativeValue);

                    if (similarityScore > 0) {
                        similarityScoreTable.put(comparativeValue, similarityScore);
                    }
                });

        return similarityScoreTable.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue())
                .map(Map.Entry::getKey)
                .toList();
    }


    /**
     * Use Myers' algorithm to calculate the similarity coefficient of two strings.
     * @param inputStr      The input string
     * @param comparisonStr String to compare to the input string
     * @return The similarity coefficient of the two strings
     */
    private int calculateSimilarity(final String inputStr, final String comparisonStr) {
        final int sourceLength = inputStr.length();
        final int targetLength = comparisonStr.length();
        final int maxEditDistance = sourceLength + targetLength;
        int[] matrix = new int[2 * maxEditDistance + 1];
        Arrays.fill(matrix, -1);
        matrix[maxEditDistance + 1] = 0;

        for (int editDistance = 0; editDistance <= maxEditDistance; editDistance++) {
            for (int diagonal = -editDistance; diagonal <= editDistance; diagonal += 2) {
                int diagonalIndex = diagonal + maxEditDistance;
                int sourceIndex;
                if (diagonal == -editDistance || (diagonal != editDistance && matrix[diagonalIndex - 1] < matrix[diagonalIndex + 1])) {
                    sourceIndex = matrix[diagonalIndex + 1]; // down
                } else {
                    sourceIndex = matrix[diagonalIndex - 1] + 1; // right
                }
                int targetIndex = sourceIndex - diagonal;

                while (sourceIndex < sourceLength && targetIndex < targetLength && inputStr.charAt(sourceIndex) == comparisonStr.charAt(targetIndex)) {
                    sourceIndex++;
                    targetIndex++;
                }

                matrix[diagonalIndex] = sourceIndex;

                if (sourceIndex >= sourceLength && targetIndex >= targetLength) {
                    return editDistance;
                }
            }
        }
        return maxEditDistance;
    }
}
