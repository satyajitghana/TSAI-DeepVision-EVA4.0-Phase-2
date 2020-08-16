# Errors you might face

1. ENOENT: no such file or directory, scandir '.serverless/requirements'

full log
```text
$ sls deploy                                                                                            ─╯
Serverless: Adding Python requirements helper...
Serverless: Generated requirements from /mnt/d/Projects/thetensorclan-aws/requirements.txt in /mnt/d/Projects/thetensorclan-aws/.serverless/requirements.txt...
Serverless: Installing requirements from /home/shadowleaf/.cache/serverless-python-requirements/cf21792650d005d9b18cf6989b17fe9ec56599d4795059a8282628420210e3ad_slspyc/requirements.txt ...
Serverless: Using download cache directory /home/shadowleaf/.cache/serverless-python-requirements/downloadCacheslspyc
Serverless: Running ...
Serverless: Zipping required Python packages...

  Error --------------------------------------------------

  Error: ENOENT: no such file or directory, scandir '.serverless/requirements'

     For debugging logs, run again after setting the "SLS_DEBUG=*" environment variable.
```

> SOLUTION: Simply run `sls-deploy` again