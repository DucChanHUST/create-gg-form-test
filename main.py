import re
import os
import csv

def read_questions_and_options(md_file):
    questions = []
    pattern = r'^\d+\. (.*)'
    with open(md_file, 'r') as file:
        lines = file.readlines()
        question = None
        options = []
        for line in lines:
            line = line.strip()
            if not line:
                continue

            match = re.match(pattern, line)
            if match:
                if question:
                    questions.append((question, options))
                question = match.group(1).replace(',', ';')
                options = []

            if line.startswith('a') or line.startswith('b') or line.startswith('c') or line.startswith('d') or line.startswith('e') or line.startswith('f') or line.startswith('g'):
                options.append(line[2:].strip().replace(',', ';'))

        if question:
            questions.append((question, options))
    return questions

def read_correct_answers(key_file):
    correct_answers = []
    with open(key_file, 'r') as file:
        lines = file.readlines()
        for line in lines:
            answer = line.strip().split('. ')[1]
            correct_answers.append(ord(answer) - ord('a'))
    return correct_answers

def write_to_csv(questions, correct_answers, csv_file, mode="w"):
    with open(csv_file, mode, newline='') as file:
        writer = csv.writer(file)
        if mode == 'w':
            writer.writerow(['Question', 'Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Correct Answer'])
        for i, (question, options) in enumerate(questions):
            correct_option = options[correct_answers[i]] if correct_answers[i] < len(options) else ''
            row = [question] + options + [''] * (7 - len(options)) + [correct_option]
            writer.writerow(row)

def main():
    csv_file = 'questions.csv'
    mode = 'w'

    for i in range(1, 10):
        md_file = f'{i}.md'
        key_file = f'{i}key.md'

        if not os.path.exists(md_file) or not os.path.exists(key_file):
            continue

        print(f'Processing {md_file} and {key_file}')
        questions = read_questions_and_options(md_file)
        correct_answers = read_correct_answers(key_file)
        write_to_csv(questions, correct_answers, csv_file, mode)
        mode = 'a'

if __name__ == "__main__":
    main()