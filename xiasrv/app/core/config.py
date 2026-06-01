from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    xia_user: str = ""
    xia_pass: str = ""
    xia_srv: str = ""
    log_level: str = "info"

    model_config = SettingsConfigDict(case_sensitive=False)


settings = Settings()
