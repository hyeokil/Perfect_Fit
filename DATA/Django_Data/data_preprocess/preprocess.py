import json


### 1. 옥타브 음계 전처리
data = """
C  16 33 65 131 262 523 1046.5 2093 4186
C# 17 35 69 139 277 554 1109 2217.5 4435
D 18 37 73 147 294 587 1175 2349 4699
D# 20 39 78 156 311 622 1244.5 2489 4978
E 21 41 82 165 330 659 1318.5 2637 5274
F 22 44 87 175 349 698.5 1397 2794 5588
F# 23 46 92.5 185 370 740 1480 2960 5920
G 25 49 98 196 392 784 1568 3136 6272
G# 26 52 104 208 415 831 1661 3322.5 6645
A 28 55 110 220 440 880 1760 3520 7040
A# 29 58 116.5 233 466 932 1865 3729 7459
B 31 62 123.5 247 494 988 1975.5 3951 7902
"""

# lines = data.strip().split('\n')
#
# notes_dict = {}
# for line in lines:
#     parts = line.split()
#     note_name = parts[0]
#     frequencies = [float(freq) for freq in parts[1:]]
#     notes_dict[note_name] = frequencies
#
# print(notes_dict)
#
# json_data = json.dumps(notes_dict, indent=4, ensure_ascii=False)
#
# print(json_data)
#
# with open('octave_data.json', 'w', encoding='utf-8') as file:
#     file.write(json_data)

# 원본 데이터
'''
    0  1  2  3   4   5   6      7    8
C   16 33 65 131 262 523 1046.5 2093 4186
C♯  17 35 69 139 277 554 1109 2217.5 4435
D   18 37 73 147 294 587 1175 2349 4699
D♯  20 39 78 156 311 622 1244.5 2489 4978
E   21 41 82 165 330 659 1318.5 2637 5274
F   22 44 87 175 349 698.5 1397 2794 5588
F♯  23 46 92.5 185 370 740 1480 2960 5920
G   25 49 98 196 392 784 1568 3136 6272
G♯  26 52 104 208 415 831 1661 3322.5 6645
A   28 55 110 220 440 880 1760 3520 7040
A♯  29 58 116.5 233 466 932 1865 3729 7459
B   31 62 123.5 247 494 988 1975.5 3951 7902
'''

######################################################

### 2. 가수 음역대 전처리
data_2 = """
강승윤 Eb2 ~ Bb4
김동률 D2 ~ C5
김영흠 D2 ~ B4
김진호 F2 ~ B4
로이킴 G2 ~ C5
박명수 F2 ~ G#4
박재정 F2 ~ E5
뷔 C3 ~ A4
성시경 C2 ~ B4
육성재 Gb2 ~ B4
윤민수 C2 ~ D#5
이석훈 E2 ~ C#5
이찬원 G2 ~ G4
임영웅 C2 ~ C5
임현식 F#2 ~ A4
장범준 D2 ~ G#4
존박 G2 ~ F4
준호 F#2 ~ A4
폴킴 G2 ~ B4
한동근 G2 ~ C#5
환희 A2 ~ C5
규현 A2 ~ D5
강균성 G#2 ~ F5
강태현 G2 ~ E5
권인하 G2 ~ C#5
권정열 G2 ~ B4
김경호 A#2 ~ D5
김길중 F2 ~ E5
김동현 G2 ~ Eb5
김범수 G2 ~ E5
김민석 A2 ~ F5
김연우 A2 ~ D5
김장훈 D2 ~ A#4
김재중 A2 ~ E5
김재환 B2 ~ F5
김종국 A2 ~ A5
김종서 Bb2 ~ E5
김준수 C3 ~ C#5
김창열 B2 ~ Eb5
김호중 G2 ~ D#5
김희재 A#2 ~ C5
나얼 G2 ~ F#5
나성호 A2 ~ B4
닐로 Bb2 ~ F5
대성 G2 ~ C#5
더원 F2 ~ D5
도영 G2 ~ B4
디오 A2 ~ C5
려욱 C3 ~ F5
마크툽 F2 ~ D#5
문명진 A2 ~ C5
박완규 C3 ~ E5
박장현 A2 ~ E5
박재범 G2 ~ A4
박효신 G2 ~ E5
백현 Ab2 ~ E5
샤오쥔 A2 ~ C5
서은광 G#2 ~ E5
손진욱 Ab2 ~ A5
신용재 C#3 ~ E5
아이언 F#2 ~ C#5
영탁 F2 ~ C5
예성 A2 ~ C#5
온유 A2 ~ B4
유회승 Bb2 ~ F#5
윤종신 F2 ~ C#5
윤도현 E2 ~ E5
이라온 A#2 ~ F5
이상곤 A2 ~ Eb5
이솔로몬 F2 ~ D5
이수 C#3 ~ F5
이승기 F#2 ~ D5
이승철 Gb2 ~ B4
이승환 F2 ~ C5
이적 E2 ~ C#5
이진성 F#2 ~ C5
이창섭 B2 ~ C#5
이혁 G#2 ~ G#5
이홍기 G2 ~ D#5
임창정 Eb2 ~ D#5
임한별 A2 ~ G5
임재범 C#2 ~ Eb5
전상근 Ab2 ~ F5
전우성 F2 ~ D#5
정국 A2 ~ D5
정동하 Bb2 ~ D#5
정승환 G#2 ~ A#4
조미 G2 ~ C#5
조용필 F2 ~ A#4
종현 A2 ~ C#5
지드래곤 D3 ~ C5
첸 G#2 ~ Db5
케이윌 Ab2 ~ D5
태민 B2 ~ C5
태양 F2 ~ C#5
태일 A2 ~ E5
하은 Bb2 ~ D#5
하현상 F#2 ~ C5
하현우 A#1 ~ A#5
황인욱 Gb2 ~ C5
황치열 G2 ~ C5
DK A#2 ~ D#5
KCM Db3 ~ Gb5
가을 Eb3 ~ C#5
공민지 E3 ~ C#5
김보아 F3 ~ E5
리즈 D#3 ~ G5
알리 F#3 ~ Gb5
이하이 E3 ~ D5
선미 C#3 ~ C5
하니 E3 ~ C5
허윤진 E3 ~ G#5
가인 E3 ~ E5
강민경 F3 ~ E5
거미 Eb3 ~ F#5
권은비 E3 ~ F5
김세정 E3 ~ E5
김연지 D#3 ~ G5
김채원 E3 ~ E5
나르샤 F3 ~ G5
나연 G#3 ~ F5
닝닝 G3 ~ F5
다나 F#3 ~ F5
다니엘 F3 ~ D5
다현 E3 ~ B4
류진 E3 ~ E5
리아 F3 ~ F#5
린 D#3 ~ E5
에이나 G3 ~ E5
먼데이 E3 ~ D5
민지 E3 ~ D5
바다 E3 ~ G5
박정현 Db3 ~ G#5
배이 F3 ~ E5
백지영 E3 ~ F5
백예린 F3 ~ G5
박기영 Ab2 ~ G#5
벤 Gb3 ~ F5
보아 F#3 ~ Eb5
샤넌 A3 ~ Gb5
서현 E3 ~ E5
선예 E3 ~ C#5
설윤 E3 ~ Gb5
소유 E3 ~ Gb5
소향 E3 ~ B5
손승연 E3 ~ G5
솔라 D#3 ~ E5
솔지 F3 ~ F#5
송하예 F3 ~ G#5
슬기 E3 ~ D5
승희 F3 ~ F#5
써니 Eb3 ~ Eb5
시은 Eb3 ~ D5
심규선 E3 ~ D5
아이사 F3 ~ D#5
아이유 D3 ~ F#5
안유진 E3 ~ E5
에일리 F3 ~ F5
예지 F#3 ~ D#5
옥주현 F3 ~ F5
웬디 G3 ~ C#5
윈터 F3 ~ E5
유나 F#3 ~ E5
유주 G3 ~ G5
은가은 E3 ~ G#5
은하 D3 ~ G5
윤하 F3 ~ E5
이선희 D3 ~ E5
이소정 C#3 ~ Eb5
이수현 Eb3 ~ F5
이영현 F3 ~ F#5
이해리 E3 ~ F#5
자우림 D#3 ~ D#5
장원영 G3 ~ C5
정연 E3 ~ E5
정유지 E3 ~ Eb5
정은지 F#2 ~ G5
제시카 G#3 ~ E5
제아 E3 ~ E5
조유진 F3 ~ A5
지우 F3 ~ G5
지젤 F3 ~ F5
지효 E3 ~ F5
채령 F#3 ~ F5
최예나 E3 ~ Gb5
카리나 Db3 ~ C#5
케이시 Eb3 ~ D5
태연 D#3 ~ F#5
티파니 영 G3 ~ Eb5
하니 E3 ~ D#5
핫펠트 G3 ~ D5
해원 G#3 ~ Eb5
화사 D3 ~ F5
효린 Eb3 ~ F#5
효정 E3 ~ F5
휘인 F#3 ~ E5
ASH ISLAND G2 ~ C5
HYNN Ab3 ~ B5
Kei F3 ~ Eb5
"""

print("\n##########\n")
with open('octave_data.json', 'r', encoding='utf-8') as file:
    octave_data = json.load(file)

'''
1. 가수 음역대 정보에는 Eb, Db 등 변화음이 존재함.
2. 사용하는 octave_data에는 변화음이 존재 하지 않음.
3. 가수의 음역대 중 변화음을 기존의 음역대로 치환
Ex) Eb = D#과 같음.
'''
note_mapping = {  # '#'이 들어가는 변화음은 없음.
    "C": "C",
    "C♯": "C♯",
    "D": "D", "Db": "C#",
    "D♯": "D♯",
    "E": "E", "Eb": "D#",
    "F": "F", "Fb": "E",
    "F♯": "F♯",
    "G": "G", "Gb": "F#",
    "G♯": "G♯",
    "A": "A", "Ab": "G#",
    "A♯": "A♯",
    "B": "B", "Bb": "A#"
}


def convert_note_name(note):
    note_name = note[:-1]
    octave = note[-1]
    return note_mapping.get(note_name, note_name) + octave


artist_info = []
lines = data_2.strip().split('\n')

for line in lines:
    parts = line.split()
    # print(parts)  # ['효린', 'Eb3', '~', 'F#5']
    artist_name = ' '.join(parts[:-3])
    # print(artist_name)
    min_note, max_note = parts[-3], parts[-1]
    # print(min_note, max_note)  # Eb3 F#5, E3 F5, F#3 E5, G2 C5, Ab3 B5, F3 Eb5

    min_note = convert_note_name(min_note)
    max_note = convert_note_name(max_note)

    min_note_name, min_octave = min_note[:-1], int(min_note[-1])
    max_note_name, max_octave = max_note[:-1], int(max_note[-1])


    # 옥타브 데이터를 참조하여 min_pitch와 max_pitch 계산
    min_pitch = int(octave_data[min_note_name][min_octave])
    max_pitch = int(octave_data[max_note_name][max_octave])
    #
    artist_info.append({
        "artist": artist_name,
        "min_note": min_note,
        "max_note": max_note,
        "min_pitch": min_pitch,
        "max_pitch": max_pitch,
        "min_octave": min_octave,
        "max_octave": max_octave
    })

# Convert to JSON and write to a file
with open('artist_data.json', 'w', encoding='utf-8') as file:
    json.dump(artist_info, file, indent=4, ensure_ascii=False)


print("-- All Done --")