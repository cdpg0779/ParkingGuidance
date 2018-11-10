C:
cd C:/Program Files/MySQL/MySQL Server 5.7/bin
mysqldump -uroot -p123456 parkingguidance > %~dp0/parkingguidance-%date:~0,4%%date:~5,2%%date:~8,2%%TIME:~0,2%%TIME:~3,2%%TIME:~6,2%.sql



