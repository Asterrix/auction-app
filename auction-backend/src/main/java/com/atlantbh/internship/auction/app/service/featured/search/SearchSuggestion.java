package com.atlantbh.internship.auction.app.service.featured.search;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .map(Map.Entry::getKey)
                .toList();
    }


    /**
     * @param inputStr      The input string
     * @param comparisonStr String to compare to the input string
     * @return The similarity coefficient of the two strings
     */
    // Imagine a chess board with input string on the left and comparison string on the top.
    // If the characters are the same, add 1 to the diagonal value.
    // If the characters are different, get the maximum value from the left and top cell.
    private int calculateSimilarity(final String inputStr, final String comparisonStr) {
        final int n = inputStr.length();
        final int m = comparisonStr.length();
        final int[][] matrix = new int[n + 1][m + 1];

        for (int row = 0; row < n; row++) {
            for (int col = 0; col < m; col++) {
                final char inputChar = inputStr.charAt(row);
                final char comparisonChar = comparisonStr.charAt(col);

                if (inputChar == comparisonChar) {
                    // Add 1 to the diagonal value
                    matrix[row + 1][col + 1] = matrix[row][col] + 1;
                } else {
                    // Get the maximum value from the left and top cell
                    matrix[row + 1][col + 1] = Math.max(matrix[row][col + 1], matrix[row + 1][col]);
                }
            }
        }

        // Take size difference into account
        final int sizeDifference = Math.abs(n - m);
        return matrix[n][m] - sizeDifference;
    }
}
