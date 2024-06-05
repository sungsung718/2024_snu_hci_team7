# 2024_snu_hci_team7
## **Frontend**

### **How to run frontend**

TODO

```bash
TODO
```

## **Backend**

### **How to run backend**

Before running the project, you need to create `.env` in `2024_snu_hci_team/backend/movierecommender` and set secret keys required for the project. Following are the required keys.

```python
DJANGO_SECRET_KEY=
OPENAI_API_KEY=
NAVER_CLIENT_ID=
NAVER_API_KEY=
```

After setting your keys, run this command.

```
> pwd
2024_snu_hci_team7/backend/movierecommender
> pip install -r requirements.txt
> python manage.py migrate
> python manage.py runserver
```
