import os
# import pandas as pd
import json
import pprint

summary = []
result_details = []

for root, directories, files in os.walk(".", topdown=False):
    if "./.git" not in root:
        for name in files:
            result_details.append({"path": os.path.join(root, name), "language" : name.split('.')[-1] })


for idx, val in enumerate(result_details):
    print(idx)
    print(val)
    if val["language"] not in summary:
        summary.append({val["language"] : 1 })
    else:
        summary.append({ val["language"] :  int(summary[val["language"]]) + 1})

pprint.pprint(summary)


# pprint.pprint({"result": result_details})


# print({ "result": result_details})

# res =  json.loads(pd.DataFrame(result_details, columns = ["path", "language"]).groupby("language").path.apply(pd.Series.tolist).to_json(orient="split"))

# for idx, val in enumerate(res['index']):
#     summary[val] =  len(res['data'][idx])
#
# print({ "summary": summary , "result": result_details})
