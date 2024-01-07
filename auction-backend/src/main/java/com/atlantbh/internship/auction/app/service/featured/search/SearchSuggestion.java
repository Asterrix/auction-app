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
     * @param strA Input string
     * @param strB Input string
     * @return Number of differences between strA and strB regarding the character count and size difference
     */
    private int calculateDifference(final String strA, final String strB) {
        final int inputLength = strB.length();
        final int listMemberLength = strA.length();

        final int lengthDifference = Math.abs(inputLength - listMemberLength);
        final int minLength = Math.min(strA.length(), strB.length());

        int difference = 0;
        for (int i = 0; i < minLength; i++) {
            if (strA.charAt(i) != strB.charAt(i)) {
                difference++;
            }
        }

        return difference + lengthDifference;
    }
}
