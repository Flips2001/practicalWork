import json
import glob

def creat_json(line):
    return {
        "unitId": line[3],
        "type": line[4],
        "position": {
            "x": line[5].strip("("),
            "y": line[6].strip(")\n"),
        },
    }


def fill_dict(line, my_dict):
    if line[2] == "Created":
        my_dict["created"].append(
            creat_json(line)
        )

    if line[2] == "Destroyed":
        my_dict["destroyed"].append(
            creat_json(line)
        )

    if line[2] == "Morph":
        my_dict["morphs"].append(
            creat_json(line)
        )

    if line[2] == "IsAttacked":
        my_dict["attacks"].append(
            {
                "unitId": line[2],
                "type": line[3].strip("()"),
                "position": {
                    "x": line[4].strip("("),
                    "y": line[5].strip(")\n"),
                },
            }
        )


def load_data(filename):
    my_dict = {
        'created': [],
        'destroyed': [],
        'attacks': [],
        'morphs': []
    }
    with open(filename, "r") as file:
        read = False
        for line in file:
            if line == "[EndGame]\n":
                read = False
            if read:
                fill_dict(line.split(","), my_dict)
            if line == "Begin replay data:\n":
                read = True

    return my_dict


def dump_data(my_dict):
    data = []
    data.append({
        "title": "created",
        "actions": my_dict["created"],
    })
    data.append(
        {
            "title": "destroyed",
            "actions": my_dict["destroyed"],
        }
    )
    data.append(
        {
            "title": "attacks",
            "actions": my_dict["attacks"],
        }
    )
    data.append(
        {
            "title": "morphs",
            "actions": my_dict["morphs"],
        }
    )
    with open('data.json', 'w') as f:
        json.dump(data, f)


def convert_data(filename):
    data = load_data(filename)
    dump_data(data)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    text_files = glob.glob('*.txt')
    convert_data(text_files[0])

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
