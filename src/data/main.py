import base64
import glob
import json
import mimetypes
import re


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


def generateActionsbyType(my_dict):
    actionsByType = []
    actionsByType.append(
        {
            "title": "created",
            "actions": my_dict["created"],
        }
    )
    actionsByType.append(
        {
            "title": "destroyed",
            "actions": my_dict["destroyed"],
        }
    )
    actionsByType.append(
        {
            "title": "attacks",
            "actions": my_dict["attacks"],
        }
    )
    actionsByType.append(
        {
            "title": "morphs",
            "actions": my_dict["morphs"],
        }
    )

    return actionsByType


def get_replay_header(filename):
    with open(filename, "r") as file:
        text = file.read()
        rep_path_match = re.search(r"RepPath: .*\\(.+?)\.rep", text)
        map_name_match = re.search(r"MapName: (.+)", text)
        map_size_match = re.search(r"MapSize: (\d+),(\d+)", text)

        rep_path = rep_path_match.group(1)
        map_name = map_name_match.group(1)

        width = int(map_size_match.group(1))
        height = int(map_size_match.group(2))

        size = {
            "width": width,
            "height": height
        }

    return rep_path, map_name, size


def convert_image(image_path):
    with open(image_path, 'rb') as image_file:
        mime_type, _ = mimetypes.guess_type(image_path)
        encoded_string = base64.b64encode(image_file.read()).decode()
        data_uri = f"data:{mime_type};base64,{encoded_string}"
    return data_uri


def convert_data(filename):
    actions = load_data(filename)
    actions_by_type = generateActionsbyType(actions)

    rep_path, map_name, size = get_replay_header(filename)

    data = {
        "name": rep_path,
        "map": {
            "name": map_name,
            "image": convert_image(f"maps/{map_name}.jpg"),
            "size": size,
        },
        "possibleActions": ["created", "destroyed", "attacks", "morphs"],
        "actionsByType": actions_by_type,
    }

    with open('data.json', 'w') as f:
        json.dump(data, f)


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    text_files = glob.glob('*.txt')
    convert_data(text_files[0])

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
