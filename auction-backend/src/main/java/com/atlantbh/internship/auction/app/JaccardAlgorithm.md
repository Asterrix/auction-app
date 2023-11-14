# Jaccard Index

**Time Complexity**: O(k * (n + m) + p)

**Space Complexity**: O((k * n) + p)

## Description

The Jaccard Index, also known as the Jaccard similarity coefficient, is a measure of similarity between two sets. It's
defined as the size of the intersection of the sets divided by the size of the union of the sets.
The formula for calculating the Jaccard Index (J) is:

![Jaccard Index](https://wikimedia.org/api/rest_v1/media/math/render/svg/b80075655821258068b67f3121a490dd65577083)

The Jaccard Index ranges from 0 to 1, where 0 indicates no similarity (no common elements between sets), and 1 indicates
complete similarity (the sets are the same).

## Issues with Jaccard Index

### Sets

Jaccard index by mathematical definition is meant to work with Sets which raises the problem of accuracy when
calculating the similarity of words because of the repeating characters.
Jaccard index would not account for the frequency of repeated characters within a single word.

For example:

Word 1: `apple`

Word 2: `appleee`

The Jaccard index of these two words is `1.0`, which means that they have a similarity of `100%`. However,
this does not accurately reflect the similarity of the two words, as they have a different number of repeated
characters.
Word 2 has two extra `e`'s, which are not present in Word 1.

### Solution

This issue can be solved by instead of using a Set data structure which only allows for unique elements,instead
we can use a Hash Map which is a list of `{Key : Value}` pairs. Where the key will be represented by a single character
and value will represent times that character is found inside the string.

By using Hash Map data structure similarity of the two words in the example above would be calculated as `0.71`
which means that they have simularity of `71%` which is more accurate.


Another solution would be to use an Array of Integers with the size of 26. The number 26 represents the number of
characters found in the English alphabet.
Each array index would represent a single character and the number of times it is found inside the array.

Both methods would provide O(1) lookup time. Space Complexity would need to be calculated and compared.

---

### ** What to take into consideration **
It is unclear to me as what the allowed user input for the product name would be, and as such, it's hard to make a decision
as should I take into consideration things such as numbers and special characters when calculating the similarity of two strings.

**I will go with the assumption that numbers and only characters of the English alphabet are allowed.**

---
### Strings

It would be important to remove whitespaces from strings as they could affect the results.

### Solution
Ignore whitespace character every time you encounter it.

---

Working with strings and characters in programming can be challenging. For example, the char data type is represented 
as an integer behind the scenes. This means that letters in the English alphabet are represented as numbers in ASCII and 
Unicode. Uppercase letters range from the number `65` to `90`, and lowercase letters range from the number `97` to `122`.

Because of this, the letters `S` and `s` will have no similarity, because the ASCII code for the uppercase letter S is `83` 
and the ASCII code for the lowercase letter s is `115`.

### Solution
There are multiple solutions to this problem:

- #### Convert all the strings to lower or upper case using Java's String methods 
The problem with this method is that it has a time complexity of O(n), where n represents the number of characters in a string.


- #### Convert the character upon insertion into a hash map 
This is a more efficient method, because you don't have to loop over the string and convert each character to upper 
or lower case. However, it does increase the code complexity, because you have to have if statements before the calls to insert values into the hash map.


- #### Use the bitwise OR operator `|`
This is the most efficient method, because it avoids the overhead of the built-in methods.
To convert an uppercase letter to lowercase using the bitwise OR operator, add the number `32` to the character's 
ASCII code. Number `32` represents the distance between the uppercase letter `A` and the lowercase letter `a` in the ASCII table.

For example, the binary representation of the character S is `01010011`. If we perform a bitwise `OR` operation with the
number 32, we get the following:
```
S = 01010011
32 = 00100000
S | 32 = 01110011

S is equal to 115 now because 1 + 2 + 16 + 32 + 64 = 115 // 115 is the code for lowercase s 
```
Now, the character `S` is equal to `115`, which is the ASCII code for the lowercase letter `s`.
The limitation of this methods is that it would only work with English alphabet because of the number of `32`.
This method also assumes that every character is a letter and not a number or special character etc...
It might also be harder for other people to understand who are not familiar with bitwise operations and binary representations.

---

## References:

[Wikipedia EN](https://en.wikipedia.org/wiki/Jaccard_index)\
[Wikipedia FR](https://fr.wikipedia.org/wiki/Indice_et_distance_de_Jaccard)

## Further reading:

[Paper From Google](https://static.googleusercontent.com/media/research.google.com/en/us/pubs/archive/36928.pdf)\
[Standford](http://theory.stanford.edu/~sergei/papers/soda10-jaccard.pdf)
