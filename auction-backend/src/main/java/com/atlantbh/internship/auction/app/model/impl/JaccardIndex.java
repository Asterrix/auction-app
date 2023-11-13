package com.atlantbh.internship.auction.app.model.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class JaccardIndex {
    final static int OR_BY = 32; // ASCII difference between uppercase and lowercase letters
    final static double MINIMUM_ALLOWED_SIMILARITY = 0.3;
    Map<Character, Integer> patternCharFrequency;

    public JaccardIndex(final String pattern) {
        patternCharFrequency = calculateCharacterFrequency(pattern);
    }

    private static Map<Character, Integer> calculateCharacterFrequency(final String str) {
        Map<Character, Integer> charFrequency = new HashMap<>();

        int l = 0;
        while (l < str.length()) {
            final char c = str.charAt(l);
            if (c != ' ') {
                if (c >= 'A' && c <= 'Z') {
                    charFrequency.put((char) (c | OR_BY), charFrequency.getOrDefault(c, 0) + 1);
                } else {
                    charFrequency.put(c, charFrequency.getOrDefault(c, 0) + 1);
                }
            }
            l++;
        }

        return charFrequency;
    }

    public String calculateSimilarity(List<String> itemList) {
        double highestMatch = Double.NEGATIVE_INFINITY;
        StringBuilder textForHighestMatch = new StringBuilder();

        for (final String itemName : itemList) {
            double similarity = calculateJaccardSimilarity(itemName);

            // Update the highest match along with corresponding text
            if (similarity > highestMatch) {
                highestMatch = similarity;
                textForHighestMatch.setLength(0);
                textForHighestMatch.append(itemName);
            }
        }

        if (highestMatch < MINIMUM_ALLOWED_SIMILARITY) {
            return "";
        }

        return textForHighestMatch.toString().toLowerCase();
    }

    private double calculateJaccardSimilarity(final String text) {
        Map<Character, Integer> textCharFrequency = calculateCharacterFrequency(text); // O(n)

        int intersection = 0;
        int union = 0;

        // Calculate intersection and union based on character frequencies of the first string
        for (final char c : textCharFrequency.keySet()) {
            if (patternCharFrequency.containsKey(c)) {
                intersection += Math.min(textCharFrequency.get(c), patternCharFrequency.get(c));
                union += Math.max(textCharFrequency.get(c), patternCharFrequency.get(c));
            } else {
                union += textCharFrequency.get(c);
            }
        }

        // Calculate union for characters present only in the second string
        for (final char c : patternCharFrequency.keySet()) {
            if (!textCharFrequency.containsKey(c)) {
                union += patternCharFrequency.get(c);
            }
        }

        // Avoid dividing by zero exceptions
        if (union == 0) {
            return 0.0;
        }

        // Calculate Jaccard similarity
        return (double) intersection / union;
    }
}
