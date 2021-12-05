import os
import pandas as pd
import json

summary = {}
result_details = []

for root, directories, files in os.walk(".", topdown=False):
    for name in files:
        result_details.append({"path": os.path.join(root, name), "language" : name.split('.')[-1] })

res =  json.loads(pd.DataFrame(result_details, columns = ["path", "language"]).groupby("language").path.apply(pd.Series.tolist).to_json(orient="split"))

for idx, val in enumerate(res['index']):
    summary[val] =  len(res['data'][idx])

print({ "summary": summary , "result": result_details})
