package com.atlantbh.internship.auction.app.model.suggestion.search;

import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class SearchSuggestion implements SearchQuerySuggestion {

    @Override
    public List<String> getSearchSuggestion(final List<String> list, final String input) {
        final String inputString = input.trim();

        if (StringUtils.isBlank(inputString)) {
            return List.of();
        }

        final Map<String, Integer> differenceTable = new HashMap<>(list.size());

        for (final String s : list) {
            final String listMember = s.trim();

            if (listMember.isEmpty()) {
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

    private int calculateDifference(final String listMember, final String input) {
        final int inputLength = input.length();
        final int listMemberLength = listMember.length();
        final int lengthDifference = Math.abs(inputLength - listMemberLength);

        int difference = 0;
        int l = 0;
        while (l < inputLength && l < listMemberLength) {
            final char listMemberChar = listMember.charAt(l);
            final char inputChar = input.charAt(l);

            if (Character.toLowerCase(listMemberChar) != Character.toLowerCase(inputChar)) {
                difference++;
            }

            l++;
        }

        return difference + lengthDifference;
    }
}
