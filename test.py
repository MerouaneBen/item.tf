import json
import tf2api
import tf2search
import cProfile

setup = """
with open('api_key.txt') as f:
    apikey = f.read()

schema = tf2api.getschema(apikey)
storeprices = tf2api.getstoreprices(apikey)

with open('blueprints.json') as f:
    data = json.loads(f.read().decode('utf-8'))

itemsbyname = tf2api.getitemsbyname(schema)
marketprices = tf2api.getmarketprices(itemsbyname)
blueprints = tf2search.parseblueprints(data,itemsbyname)
"""

cProfile.run(setup)
cProfile.run("itemsdict = tf2search.getitemsdict(schema,blueprints,storeprices,marketprices)")
cProfile.run("tf2search.search('spy',itemsdict)")
cProfile.run("tf2search.search('class',itemsdict)")