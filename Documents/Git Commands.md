Add New Commit
==============

1. Change some code
2. Execute `git add file-name-changed`
3. Execute `git commit -m 'some commit description'`
4. Execute `git push` or `git push origin master`

Update Local Remote Repository
==============================
1. Execute `git pull`

Update Local Repository Avoiding the Amount of Merges
==============================
1. Execute `git pull --rebase` or `git pull --rebase origin master`

Update many files
===================
- `git add -A` stages All
- `git add .` stages new and modified, without deleted
- `git add -u` stages modified and deleted, without new

Commit a removed file
=====================
- `git rm FILE_NAME_DELETED`

Delete the last commit before Push
==================================
- `git reset --hard HEAD~1` or `git commit -c ORIG_HEAD`

Discard a File Change
==================================
- `git checkout --YOUR_FILE_NAME`


Show Differences Between the Remote and Local Repository
==================================
- `git diff`
- type `q` to leave the text
