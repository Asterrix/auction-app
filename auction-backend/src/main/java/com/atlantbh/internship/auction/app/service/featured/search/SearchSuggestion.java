package com.atlantbh.internship.auction.app.service.featured.search;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public final class SearchSuggestion {

    /**
     * @param list  List of strings to be searched
     * @param input Input string
     * @return List of strings from list parameter sorted by similarity to input parameter
     */
    public List<String> searchSuggestion(final List<String> list, final String input) {
        final String inputString = input.trim();

        if (StringUtils.isBlank(inputString)) {
            return List.of();
        }

        final Map<String, Integer> differenceTable = new HashMap<>(list.size());

        for (final String s : list) {
            final String listMember = s.trim();

            if (listMember.isEmpty() || differenceTable.containsKey(listMember)) {
                continue;
            }

            final int calculatedDifference = calculateDifference(listMember, inputString);
            differenceTable.put(listMember, calculatedDifference);
        }

        return differenceTable
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .toList();
    }

    /**
     * @param stringA Input string
     * @param StringB Input string
     * @return Number of differences between stringA and StringB regarding the character count and size difference
     */
    private static int calculateDifference(final String stringA, final String StringB) {
        final int inputLength = StringB.length();
        final int listMemberLength = stringA.length();
        final int lengthDifference = Math.abs(inputLength - listMemberLength);

        int difference = 0;

        int l = 0;
        while (l < inputLength && l < listMemberLength) {
            final char listMemberChar = stringA.charAt(l);
            final char inputChar = StringB.charAt(l);

            if (Character.toLowerCase(listMemberChar) != Character.toLowerCase(inputChar)) {
                difference++;
            }

            l++;
        }

        return difference + lengthDifference;
    }
}
