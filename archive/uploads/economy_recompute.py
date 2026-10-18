#!/usr/bin/env python3
"""Recompute descriptive annual pre/post comparisons from the supplied observation rows."""
import csv, json, statistics, pathlib
base=pathlib.Path(__file__).resolve().parent
rows=list(csv.DictReader((base/'economy_extended_observations.csv').open()))
out={}
for id in ('wdi-gdp-growth','wdi-inflation-annual'):
    vals={int(x['period']):float(x['value']) for x in rows if x['metric_id']==id and x['period'].isdigit()}
    pre=[vals[y] for y in range(2004,2014)]
    post=[vals[y] for y in range(2014,2024)]
    out[id]={'pre_2004_2013_mean':round(statistics.mean(pre),4),'post_2014_2023_mean':round(statistics.mean(post),4),'difference_pp':round(statistics.mean(post)-statistics.mean(pre),4),'method':'unweighted arithmetic mean of annual World Bank reported rates; descriptive not causal'}
print(json.dumps(out,indent=2))
(base/'economy_derived_comparisons.json').write_text(json.dumps(out,indent=2))
