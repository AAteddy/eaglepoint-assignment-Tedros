import re
from collections import Counter
from typing import List, Dict

def smart_text_analyzer(text: str) -> Dict:
    """
    Analyzes a given text and returns word count, average word length,
    longest words, and word frequency.

    Args:
        text (str): The input text to analyze.

    Returns:
        dict: A dictionary containing the analysis results.
    """ 

    words = re.findall(r'[a-zA-Z]+', text.lower())

    if not words:
        return {
            "word_count": 0,
            "average_word_length": 0.00,
            "longest_words": [],
            "word_frequescy": {}
        }

    word_count = len(words)
    total_length = sum(len(word) for word in words)
    average_length = round(total_length / word_count, 2)

    max_length = max(len(word) for word in words)
    longest_words = [word for word in words if len(word) == max_length]

    seen = set()
    longest_words  = [w for w in longest_words if not (w in seen or seen.add(w))]

    frequency = Counter(words)
    word_frequency = dict(frequency)

    return {
        "word_count": word_count,
        "average_word_length": average_length,
        "longest_words": longest_words,
        "word_frequescy": word_frequency
    }


if __name__ == "__main__":
    sample = "The234 quick, brown fox jumps. over the lazy/ dog the fox8"
    print(smart_text_analyzer(sample))

