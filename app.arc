@app
link-pages

@static
fingerprint true
folder public

@http
get /
post /learn

#Fingerprinted Modules and components
get /components/*

@tables
data
  scopeID *String
  dataID **String
  ttl TTL

@aws
region us-east-1
profile begin-examples