# 2024_snu_hci_team7
## **Frontend**

### **How to run frontend**

You need `Node.js` to run this project. 

After installing nodejs, run:

```jsx
> cd {your source}/2024_snu_hci_team7/frontend // go to project directory
> npm install // install pakages
> npm run dev // run project
```

Make sure you also run the backend server.

## **Backend**

### **How to run backend**

Before running the project, you need to create `.env` in `2024_snu_hci_team7/backend/movierecommender` and set secret keys required for the project. Following are the required keys.

```python
DJANGO_SECRET_KEY=
OPENAI_API_KEY=
NAVER_CLIENT_ID=
NAVER_API_KEY=
```

After setting your keys, run this command. Python 10, 11, and 12 are supported.

```bash
> pwd
2024_snu_hci_team7/backend/movierecommender
> pip install -r requirements.txt
> python manage.py migrate
> python manage.py runserver
```
