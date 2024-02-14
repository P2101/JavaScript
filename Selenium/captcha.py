from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

chrome_options = Options()
chrome_options.add_experimental_option('detach', True) # Para que no se cierre el navegador

driver = webdriver.Chrome(chrome_options)

driver.get('https://www.google.com/recaptcha/api2/demo')

time.sleep(2)

driver.switch_to.frame(0) # Para hacer click en el CAPTCHA

driver.find_element(By.XPATH, '//*[@id="recaptcha-anchor"]').click()
